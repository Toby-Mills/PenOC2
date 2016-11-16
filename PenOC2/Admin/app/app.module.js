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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var app_component_1 = require('./components/app/app.component');
var buttonBar_component_1 = require('./components/buttonBar/buttonBar.component');
var competitor_component_1 = require('./components/competitor/competitor.component');
var oevent_component_1 = require("./components/oevent/oevent.component");
var oeventList_component_1 = require("./components/oeventList/oeventList.component");
var courseList_component_1 = require("./components/courseList/courseList.component");
var course_component_1 = require("./components/course/course.component");
var resultList_component_1 = require("./components/resultList/resultList.component");
var newsList_component_1 = require("./components/newsList/newsList.component");
var newsItem_component_1 = require("./components/newsItem/newsItem.component");
var fileUpload_component_1 = require('./components/fileUpload/fileUpload.component');
var lookupEditor_component_1 = require('./components/lookupEditor/lookupEditor.component');
var resultTime_pipe_1 = require('./pipes/resultTime.pipe');
var dateString_pipe_1 = require('./pipes/dateString.pipe');
var course_service_1 = require('./services/course.service');
var lookup_service_1 = require('./services/lookup.service');
var competitor_service_1 = require('./services/competitor.service');
var oevent_service_1 = require('./services/oevent.service');
var result_service_1 = require('./services/result.service');
var news_service_1 = require('./services/news.service');
var url_service_1 = require('./services/url.service');
var common_1 = require('@angular/common');
var upload_service_1 = require('./services/upload.service');
var matchingCompetitors_pipe_1 = require('./pipes/matchingCompetitors.pipe');
var people_pipe_1 = require('./pipes/people.pipe');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot([
                    { path: '', redirectTo: '/events', pathMatch: 'full' },
                    { path: 'events', component: oeventList_component_1.OEventListComponent },
                    { path: 'events/:eventId', component: oevent_component_1.OEventComponent },
                    { path: 'events/:eventId/courses', component: courseList_component_1.CourseListComponent },
                    { path: 'events/:eventId/courses/:courseId', component: course_component_1.CourseComponent },
                    { path: 'events/:eventId/courses/new', component: course_component_1.CourseComponent },
                    { path: 'news', component: newsList_component_1.NewsListComponent },
                    { path: 'news/:id', component: newsItem_component_1.NewsItemComponent },
                    { path: 'news/new', component: newsItem_component_1.NewsItemComponent },
                    { path: 'lookups', component: lookupEditor_component_1.LookupEditorComponent }
                ])],
            declarations: [app_component_1.AppComponent,
                competitor_component_1.CompetitorComponent,
                buttonBar_component_1.ButtonBarComponent,
                oevent_component_1.OEventComponent,
                oeventList_component_1.OEventListComponent,
                courseList_component_1.CourseListComponent,
                course_component_1.CourseComponent,
                resultList_component_1.ResultListComponent,
                dateString_pipe_1.DateString,
                resultTime_pipe_1.resultTime,
                newsList_component_1.NewsListComponent,
                newsItem_component_1.NewsItemComponent,
                people_pipe_1.PeoplePipe,
                matchingCompetitors_pipe_1.MatchingCompetitorsPipe,
                fileUpload_component_1.FileUploadComponent,
                lookupEditor_component_1.LookupEditorComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [oevent_service_1.OEventService,
                course_service_1.CourseService,
                lookup_service_1.LookupService,
                competitor_service_1.CompetitorService,
                result_service_1.ResultService,
                news_service_1.NewsService,
                url_service_1.UrlService,
                upload_service_1.UploadService,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }] // services
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map