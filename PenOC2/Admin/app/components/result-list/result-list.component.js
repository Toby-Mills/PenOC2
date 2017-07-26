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
var result_service_1 = require("../../services/result.service");
var course_model_1 = require("../../models/course.model");
var result_model_1 = require("../../models/result.model");
var lookup_service_1 = require("../../services/lookup.service");
var forms_1 = require("@angular/forms");
var ResultListComponent = ResultListComponent_1 = (function () {
    function ResultListComponent(resultService, lookupService) {
        this.resultService = resultService;
        this.lookupService = lookupService;
        this.propagateChange = function (_) { };
    }
    ResultListComponent.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.resultList = value;
        }
    };
    ResultListComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    ResultListComponent.prototype.registerOnTouched = function () { };
    ResultListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lookupService.clubList.subscribe(function (clubData) { return _this.clubList = clubData; });
    };
    ResultListComponent.prototype.renumberPostitions = function () {
        this.resultList.map(function (result, index) { result.position = index + 1; });
    };
    ResultListComponent.prototype.newResult = function (event) {
        this.resultList.push(new result_model_1.ResultModel);
        this.resultList[this.resultList.length - 1].position = this.resultList.length;
        this.propagateChange(this.resultList);
    };
    ResultListComponent.prototype.setCompetitor = function (index, competitor) {
        if (competitor) {
            this.resultList[index].competitorId = competitor.id;
            this.resultList[index].competitor = competitor.fullName;
        }
        else {
            this.resultList[index].competitorId = null;
            this.resultList[index].competitor = null;
        }
        this.propagateChange(this.resultList);
    };
    ResultListComponent.prototype.correctTime = function (index, timeString) {
        var newTimeString;
        if (!isNaN(Number(timeString))) {
            if (timeString.length < 6) {
                timeString = new Array(6 - timeString.length + 1).join('0') + timeString;
            }
            newTimeString = timeString.substr(4, 2); // seconds
            newTimeString = timeString.substr(2, 2) + ':' + newTimeString; // minutes
            newTimeString = timeString.substr(0, 2) + ':' + newTimeString; // hours
            this.resultList[index].time = newTimeString;
            this.propagateChange(this.resultList);
        }
    };
    ResultListComponent.prototype.deleteClicked = function (event, position) {
        this.deleteResult(position);
    };
    ResultListComponent.prototype.deleteResult = function (position) {
        this.resultList.splice(this.resultList.findIndex(function (result) { return result.position === position; }), 1);
        this.renumberPostitions();
        this.propagateChange(this.resultList);
    };
    return ResultListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", course_model_1.CourseModel)
], ResultListComponent.prototype, "course", void 0);
ResultListComponent = ResultListComponent_1 = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'result-list',
        templateUrl: './result-list.template.html',
        styleUrls: ['./result-list.style.css'],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return ResultListComponent_1; }),
                multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [result_service_1.ResultService, lookup_service_1.LookupService])
], ResultListComponent);
exports.ResultListComponent = ResultListComponent;
var ResultListComponent_1;
//# sourceMappingURL=result-list.component.js.map