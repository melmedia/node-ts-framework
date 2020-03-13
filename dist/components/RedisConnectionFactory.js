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
const inversify_1 = require("inversify");
const IORedis = require("ioredis");
const config_1 = require("@c7s/config");
const di_1 = require("../di");
let RedisConnectionFactory = class RedisConnectionFactory {
    async create() {
        const connection = new IORedis(this.config);
        await new Promise((resolve, reject) => {
            connection.on('connect', () => {
                resolve();
            });
            connection.on('error', (err) => {
                connection.quit();
                reject(err);
            });
        });
        return connection;
    }
};
__decorate([
    di_1.inject(di_1.Type.RedisConfig),
    __metadata("design:type", config_1.RedisConfig)
], RedisConnectionFactory.prototype, "config", void 0);
RedisConnectionFactory = __decorate([
    inversify_1.injectable()
], RedisConnectionFactory);
exports.RedisConnectionFactory = RedisConnectionFactory;
//# sourceMappingURL=RedisConnectionFactory.js.map