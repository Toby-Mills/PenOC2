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
var url_service_1 = require("../services/url.service");
var ResultService = (function () {
    function ResultService(http, urlService) {
        this.http = http;
        this.urlService = urlService;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    ResultService.prototype.getCourseResults = function (idCourse) {
        return Promise.resolve(this.http.get(this.urlService.apiUrl() + '/Courses/' + idCourse + '/Results'));
    };
    ResultService.prototype.putResult = function (result) {
        return Promise.resolve(this.http.put(this.urlService.apiUrl() + '/Results/', JSON.stringify(result), { headers: this.headers }));
    };
    ResultService.prototype.postResult = function (result) {
        return Promise.resolve(this.http.post(this.urlService.apiUrl() + '/Results/', JSON.stringify(result), { headers: this.headers }));
    };
    ResultService.prototype.putCourseResults = function (courseId, results) {
        return Promise.resolve(this.http.put(this.urlService.apiUrl() + '/Courses/' + courseId + '/Results', JSON.stringify(results), { headers: this.headers }));
    };
    return ResultService;
}());
ResultService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, url_service_1.UrlService])
], ResultService);
exports.ResultService = ResultService;
//# sourceMappingURL=result.service.js.map