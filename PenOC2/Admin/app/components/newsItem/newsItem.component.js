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
var news_model_1 = require("../../../penoc-sdk/models/news.model");
var router_1 = require("@angular/router");
var news_service_1 = require("../../../penoc-sdk/services/news.service");
var NewsItemComponent = (function () {
    function NewsItemComponent(newsService, router, route) {
        this.newsService = newsService;
        this.router = router;
        this.route = route;
    }
    NewsItemComponent.prototype.ngOnInit = function () {
        this.loadNewsItem();
    };
    NewsItemComponent.prototype.loadNewsItem = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            if (id > 0) {
                _this.newsService.getNewsItems(id).then(function (data) {
                    data.subscribe(function (newsData) {
                        _this.newsItem = newsData.json()[0];
                        _this.newsItem.date = new Date(_this.newsItem.date).toISOString().substring(0, 10);
                    });
                });
            }
            else {
                _this.newsItem = new news_model_1.NewsModel();
            }
        });
    };
    NewsItemComponent.prototype.backClicked = function () {
        this.router.navigate(['/news']);
    };
    NewsItemComponent.prototype.cancelClicked = function () {
        this.loadNewsItem();
    };
    NewsItemComponent.prototype.saveClicked = function () {
        if (this.newsItem.id > 0) {
            this.saveNewsItem();
        }
        else {
            this.createNewsItem();
        }
    };
    NewsItemComponent.prototype.saveNewsItem = function () {
        var _this = this;
        this.newsService.putNewsItem(this.newsItem)
            .then(function (data) {
            data.subscribe(function () { _this.loadNewsItem(); });
        });
    };
    NewsItemComponent.prototype.createNewsItem = function () {
        var _this = this;
        this.newsService.postNewsItem(this.newsItem)
            .then(function (data) {
            data.subscribe(function () { _this.loadNewsItem(); });
        });
    };
    return NewsItemComponent;
}());
NewsItemComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'news-item',
        templateUrl: './newsItem.template.html',
        styleUrls: ['./newsItem.style.css']
    }),
    __metadata("design:paramtypes", [news_service_1.NewsService, router_1.Router, router_1.ActivatedRoute])
], NewsItemComponent);
exports.NewsItemComponent = NewsItemComponent;
//# sourceMappingURL=newsItem.component.js.map