"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const inversify_1 = require("inversify");
const config_1 = require("@melmedia/config");
const di_1 = require("../di");
let LoggerFactory = class LoggerFactory {
    constructor() {
        this.isLoggerLibInitialized = false;
    }
    create(category) {
        if (!this.isLoggerLibInitialized) {
            this.initializeLoggerLib();
        }
        return log4js.getLogger(category);
    }
    initializeLoggerLib() {
        if (this.isLoggerLibInitialized) {
            return;
        }
        log4js.configure(this.getLoggerLibConfig());
        this.isLoggerLibInitialized = true;
    }
    getLoggerLibConfig() {
        return {
            appenders: {
                everything: this.getAppenderFromConfig(this.logConfig.main),
                access: this.getAppenderFromConfig(this.logConfig.access),
            },
            categories: {
                default: { appenders: ['everything'], level: this.logConfig.main.level },
                db: { appenders: ['everything'], level: this.logConfig.main.level },
                access: { appenders: ['access'], level: this.logConfig.access.level },
            },
        };
    }
    getAppenderFromConfig(categoryConfig) {
        const appenderConfigMap = {
            file: {
                type: 'file',
                filename: categoryConfig.filename,
                maxLogSize: 50 * 1024 * 1024,
                backups: 10,
                compress: true,
            },
            dateFile: {
                type: 'dateFile',
                filename: categoryConfig.filename,
                daysToKeep: 10,
                compress: true,
            },
            console: {
                type: 'console',
            },
        };
        if (undefined === appenderConfigMap[categoryConfig.type]) {
            throw new Error(`Appender config of type ${categoryConfig.type} is not defined`);
        }
        return appenderConfigMap[categoryConfig.type];
    }
};
__decorate([
    di_1.inject(di_1.Type.LogConfig),
    __metadata("design:type", config_1.LogConfig)
], LoggerFactory.prototype, "logConfig", void 0);
LoggerFactory = __decorate([
    inversify_1.injectable()
], LoggerFactory);
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=LoggerFactory.js.map