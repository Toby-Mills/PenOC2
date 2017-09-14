"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var api_service_1 = require("./services/api.service");
var competitor_service_1 = require("./services/competitor.service");
var course_service_1 = require("./services/course.service");
var lookup_service_1 = require("./services/lookup.service");
var news_service_1 = require("./services/news.service");
var oevent_service_1 = require("./services/oevent.service");
var result_service_1 = require("./services/result.service");
var upload_service_1 = require("./services/upload.service");
var PenocSdkModule = PenocSdkModule_1 = (function () {
    function PenocSdkModule() {
    }
    PenocSdkModule.forRoot = function () {
        return {
            ngModule: PenocSdkModule_1,
            providers: [api_service_1.ApiService,
                competitor_service_1.CompetitorService,
                course_service_1.CourseService,
                lookup_service_1.LookupService,
                news_service_1.NewsService,
                oevent_service_1.OEventService,
                result_service_1.ResultService,
                upload_service_1.UploadService]
        };
    };
    return PenocSdkModule;
}());
PenocSdkModule = PenocSdkModule_1 = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [],
        providers: [],
        exports: []
    })
], PenocSdkModule);
exports.PenocSdkModule = PenocSdkModule;
var PenocSdkModule_1;
//# sourceMappingURL=penoc-sdk.module.js.map