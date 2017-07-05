"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var app_component_1 = require("./components/app/app.component");
var button_bar_component_1 = require("./components/button-bar/button-bar.component");
var competitor_editor_component_1 = require("./components/competitor-editor/competitor-editor.component");
var competitor_component_1 = require("./components/competitor/competitor.component");
var competitor_list_component_1 = require("./components/competitor-list/competitor-list.component");
var oevent_component_1 = require("./components/oevent/oevent.component");
var oevent_list_component_1 = require("./components/oevent-list/oevent-list.component");
var course_list_component_1 = require("./components/course-list/course-list.component");
var course_component_1 = require("./components/course/course.component");
var result_list_component_1 = require("./components/result-list/result-list.component");
var news_list_component_1 = require("./components/news-list/news-list.component");
var newsItem_component_1 = require("./components/newsItem/newsItem.component");
var file_upload_component_1 = require("./components/file-upload/file-upload.component");
var lookup_editor_component_1 = require("./components/lookup-editor/lookup-editor.component");
var result_time_pipe_1 = require("./pipes/result-time.pipe");
var date_string_pipe_1 = require("./pipes/date-string.pipe");
var matching_competitors_pipe_1 = require("./pipes/matching-competitors.pipe");
var people_pipe_1 = require("./pipes/people.pipe");
var course_service_1 = require("./services/course.service");
var lookup_service_1 = require("./services/lookup.service");
var competitor_service_1 = require("./services/competitor.service");
var oevent_service_1 = require("./services/oevent.service");
var result_service_1 = require("./services/result.service");
var news_service_1 = require("./services/news.service");
var api_service_1 = require("./services/api.service");
var upload_service_1 = require("./services/upload.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot([
                { path: '', redirectTo: '/events', pathMatch: 'full' },
                { path: 'events', component: oevent_list_component_1.OEventListComponent },
                { path: 'events/:eventId', component: oevent_component_1.OEventComponent },
                { path: 'events/:eventId/courses', component: course_list_component_1.CourseListComponent },
                { path: 'events/:eventId/courses/:courseId', component: course_component_1.CourseComponent },
                { path: 'events/:eventId/courses/new', component: course_component_1.CourseComponent },
                { path: 'news', component: news_list_component_1.NewsListComponent },
                { path: 'news/:id', component: newsItem_component_1.NewsItemComponent },
                { path: 'news/new', component: newsItem_component_1.NewsItemComponent },
                { path: 'lookups', component: lookup_editor_component_1.LookupEditorComponent },
                { path: 'competitors', component: competitor_list_component_1.CompetitorListComponent }
            ])],
        declarations: [app_component_1.AppComponent,
            competitor_editor_component_1.CompetitorEditorComponent,
            competitor_component_1.CompetitorComponent,
            competitor_list_component_1.CompetitorListComponent,
            button_bar_component_1.ButtonBarComponent,
            oevent_component_1.OEventComponent,
            oevent_list_component_1.OEventListComponent,
            course_list_component_1.CourseListComponent,
            course_component_1.CourseComponent,
            result_list_component_1.ResultListComponent,
            news_list_component_1.NewsListComponent,
            newsItem_component_1.NewsItemComponent,
            file_upload_component_1.FileUploadComponent,
            lookup_editor_component_1.LookupEditorComponent,
            date_string_pipe_1.DateStringPipe,
            result_time_pipe_1.ResultTimePipe,
            people_pipe_1.PeoplePipe,
            matching_competitors_pipe_1.MatchingCompetitorsPipe],
        bootstrap: [app_component_1.AppComponent],
        providers: [oevent_service_1.OEventService,
            course_service_1.CourseService,
            lookup_service_1.LookupService,
            competitor_service_1.CompetitorService,
            result_service_1.ResultService,
            news_service_1.NewsService,
            api_service_1.ApiService,
            upload_service_1.UploadService,
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }] // services
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map