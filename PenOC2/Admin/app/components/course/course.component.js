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
var core_1 = require('@angular/core');
var course_model_1 = require('../../models/course.model');
var course_service_1 = require('../../services/course.service');
var result_service_1 = require('../../services/result.service');
var lookup_service_1 = require('../../services/lookup.service');
var router_1 = require('@angular/router');
var resultList_component_1 = require('../resultList/resultList.component');
var CourseComponent = (function () {
    function CourseComponent(courseService, resultService, lookupService, router, route) {
        this.courseService = courseService;
        this.resultService = resultService;
        this.lookupService = lookupService;
        this.router = router;
        this.route = route;
    }
    CourseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lookupService.technicalDifficultyList.subscribe(function (data) { return _this.technicalDifficultyList = data; });
        this.route.params.forEach(function (params) {
            _this.loadCourse();
        });
    };
    CourseComponent.prototype.loadCourse = function () {
        var _this = this;
        var courseId;
        var eventId;
        this.route.params.forEach(function (params) {
            courseId = +params['courseId'];
            eventId = +params['eventId'];
        });
        if (courseId > 0) {
            this.courseService.getCourse(courseId).then(function (response) {
                response.subscribe(function (courseData) {
                    _this.course = courseData.json()[0];
                });
            });
            this.resultService.getCourseResults(courseId).then(function (response) {
                response.subscribe(function (resultsData) {
                    _this.resultList = resultsData.json();
                    _this.resultList.forEach(function (result, resultIndex) {
                        result.time = new Date(result.time).toISOString().substring(11, 19);
                    });
                });
            });
        }
        else {
            this.course = new course_model_1.CourseModel();
            this.course.eventId = eventId;
            this.resultList = new Array();
        }
    };
    CourseComponent.prototype.saveCourse = function () {
        var _this = this;
        this.courseService.putCourse(this.course)
            .then(function (data) {
            data.subscribe(function (courseData) {
                _this.loadCourse();
            });
        });
        this.saveResults();
    };
    CourseComponent.prototype.createCourse = function () {
        var _this = this;
        this.courseService.postCourse(this.course)
            .then(function (data) {
            data.subscribe(function (courseData) {
                _this.course.id = courseData.json().id;
                _this.saveResults();
                _this.loadCourse();
            });
        });
    };
    CourseComponent.prototype.upsertCourse = function () {
        if (this.course.id > 0) {
            this.saveCourse();
        }
        else {
            this.createCourse();
        }
    };
    CourseComponent.prototype.cancelClicked = function () {
        this.loadCourse();
    };
    CourseComponent.prototype.saveResults = function () {
        var _this = this;
        this.resultList.map(function (result) { return result.courseId = _this.course.id; });
        this.resultService.putCourseResults(this.course.id, this.resultList)
            .then(function (data) { return data.subscribe(function (data) { }); });
    };
    __decorate([
        core_1.ViewChild('results'), 
        __metadata('design:type', resultList_component_1.ResultListComponent)
    ], CourseComponent.prototype, "results", void 0);
    CourseComponent = __decorate([
        core_1.Component({
            selector: 'course',
            templateUrl: './app/components/course/course.template.html',
            styleUrls: ['./app/components/course/course.style.css']
        }), 
        __metadata('design:paramtypes', [course_service_1.CourseService, result_service_1.ResultService, lookup_service_1.LookupService, router_1.Router, router_1.ActivatedRoute])
    ], CourseComponent);
    return CourseComponent;
}());
exports.CourseComponent = CourseComponent;
//# sourceMappingURL=course.component.js.map