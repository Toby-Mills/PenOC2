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
var oevent_service_1 = require('../../services/oevent.service');
var course_service_1 = require('../../services/course.service');
var router_1 = require('@angular/router');
var CourseListComponent = (function () {
    function CourseListComponent(oeventService, courseService, router, route) {
        this.oeventService = oeventService;
        this.courseService = courseService;
        this.router = router;
        this.route = route;
    }
    CourseListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['eventId'];
            if (id > 0) {
                _this.courseService.getEventCourses(id).then(function (data) {
                    data.subscribe(function (courseData) {
                        _this.courseList = courseData.json();
                    });
                });
                _this.oeventService.getOEvent(id).then(function (data) {
                    data.subscribe(function (eventData) {
                        _this.oevent = eventData.json()[0];
                    });
                });
            }
            else {
                _this.oevent = null;
                _this.courseList = null;
            }
        });
    };
    CourseListComponent.prototype.courseClicked = function (courseId) {
        this.router.navigate(["/events", this.oevent.id, "courses", courseId]);
    };
    CourseListComponent.prototype.newClicked = function () {
        this.router.navigate(["/events", this.oevent.id, "courses", "new"]);
    };
    CourseListComponent.prototype.backClicked = function () {
        this.router.navigate(["/events", this.oevent.id]);
    };
    CourseListComponent.prototype.deleteCourse = function (event, courseId) {
        var _this = this;
        event.stopPropagation();
        this.courseService.deleteCourse(courseId).then(function (result) {
            result.subscribe(function (data) {
                var newCourseList = _this.courseList.filter(function (course, index, array) { return (course.id != courseId); });
                _this.courseList = newCourseList;
            });
        });
    };
    CourseListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-list',
            templateUrl: './course-list.template.html'
        }), 
        __metadata('design:paramtypes', [oevent_service_1.OEventService, course_service_1.CourseService, router_1.Router, router_1.ActivatedRoute])
    ], CourseListComponent);
    return CourseListComponent;
}());
exports.CourseListComponent = CourseListComponent;
//# sourceMappingURL=course-list.component.js.map