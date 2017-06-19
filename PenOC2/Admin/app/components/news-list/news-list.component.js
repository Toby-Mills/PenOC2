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
var news_service_1 = require("../../services/news.service");
var router_1 = require("@angular/router");
var NewsListComponent = (function () {
    function NewsListComponent(newsService, router) {
        this.newsService = newsService;
        this.router = router;
        this.newsList = new Array();
    }
    NewsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.newsService.getNewsItems(null, null, new Date()).then(function (data) { return data.subscribe(function (newsData) {
            _this.newsList = newsData.json();
        }); });
    };
    NewsListComponent.prototype.newsItemClick = function (newsItemId) {
        this.router.navigate(['/news', newsItemId]);
    };
    NewsListComponent.prototype.newNewsItem = function () {
        this.router.navigate(['/news/new']);
    };
    return NewsListComponent;
}());
NewsListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'news-list',
        templateUrl: './news-list.template.html',
        styleUrls: ['./news-list.style.css']
    }),
    __metadata("design:paramtypes", [news_service_1.NewsService, router_1.Router])
], NewsListComponent);
exports.NewsListComponent = NewsListComponent;
//# sourceMappingURL=news-list.component.js.map