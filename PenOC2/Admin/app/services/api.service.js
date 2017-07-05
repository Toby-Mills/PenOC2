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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        if (location.host.toLowerCase().startsWith('localhost')) {
            this.apiUrl = 'http://localhost/penoc2/api';
        }
        else {
            this.apiUrl = 'http://www.penoc.org.za/api';
        }
    }
    ApiService.prototype.appendApiHeaders = function (options) {
        options = options || {};
        options.headers = options.headers || new http_1.Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('API_KEY', 'Orienteering');
        return options;
    };
    ApiService.prototype.get = function (url, options) {
        url = this.apiUrl + url;
        options = this.appendApiHeaders(options);
        return this.http.get(url, options);
    };
    ApiService.prototype.post = function (url, body, options) {
        url = this.apiUrl + url;
        options = this.appendApiHeaders(options);
        return this.http.post(url, body, options);
    };
    ApiService.prototype.put = function (url, body, options) {
        url = this.apiUrl + url;
        options = this.appendApiHeaders(options);
        return this.http.put(url, body, options);
    };
    ApiService.prototype.delete = function (url, options) {
        url = this.apiUrl + url;
        options = this.appendApiHeaders(options);
        return this.http.delete(url, options);
    };
    ApiService.prototype.signIn = function (userName, password) {
        return this.post(this.apiUrl + '/authenticate', { username: userName, password: password });
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map