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
const express = require("express");
const routing_controllers_1 = require("routing-controllers");
const config_1 = require("@melmedia/config");
const Application_1 = require("./Application");
const AccessLogMiddlewareFactory_1 = require("./middlewares/AccessLogMiddlewareFactory");
const di_1 = require("./di");
class WebApplication extends Application_1.Application {
    constructor(modules, middlewares) {
        super(modules);
        this.middlewares = middlewares;
        this.express = express();
    }
    async run() {
        try {
            await this.init();
            this.express.use((new AccessLogMiddlewareFactory_1.AccessLogMiddlewareFactory).create());
            routing_controllers_1.useExpressServer(this.express, {
                controllers: this.modules.map(module => module.controllers),
                middlewares: this.middlewares,
                defaultErrorHandler: false,
            });
            const { host, port } = this.config;
            const server = await new Promise((resolve, reject) => {
                const server = this.express
                    .listen(port, host, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(server);
                }).on('error', (err) => {
                    reject(err);
                });
            });
            this.logger.info(`Server started at http://${host}:${port}`);
            process.on('SIGTERM', () => {
                this.logger.info('Got SIGTERM, stopping application');
                server.close(() => {
                    this.end();
                });
            });
        }
        catch (e) {
            if (!this.isInitialized) {
                console.error(e);
            }
            else {
                this.logger.error(e);
            }
            await this.end();
            process.exit(1);
        }
    }
}
__decorate([
    di_1.inject(di_1.Type.ServerConfig),
    __metadata("design:type", config_1.ServerConfig)
], WebApplication.prototype, "config", void 0);
exports.WebApplication = WebApplication;
//# sourceMappingURL=WebApplication.js.map