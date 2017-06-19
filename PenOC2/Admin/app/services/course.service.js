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
require("rxjs/Rx");
var url_service_1 = require("../services/url.service");
var CourseService = (function () {
    function CourseService(http, urlService) {
        this.http = http;
        this.urlService = urlService;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    CourseService.prototype.getCourse = function (idCourse) {
        return Promise.resolve(this.http.get(this.urlService.apiUrl() + '/Courses/' + idCourse));
    };
    CourseService.prototype.getEventCourses = function (idOEvent) {
        return Promise.resolve(this.http.get(this.urlService.apiUrl() + '/Oevents/' + idOEvent + '/Courses'));
    };
    CourseService.prototype.putCourse = function (course) {
        return Promise.resolve(this.http.put(this.urlService.apiUrl() + '/Courses/', JSON.stringify(course), { headers: this.headers }));
    };
    CourseService.prototype.postCourse = function (course) {
        return Promise.resolve(this.http.post(this.urlService.apiUrl() + '/Courses/', JSON.stringify(course), { headers: this.headers }));
    };
    CourseService.prototype.deleteCourse = function (courseId) {
        return Promise.resolve(this.http.delete(this.urlService.apiUrl() + '/Courses/' + courseId));
    };
    return CourseService;
}());
CourseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, url_service_1.UrlService])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map