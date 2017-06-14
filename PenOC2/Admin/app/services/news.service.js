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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var url_service_1 = require("../services/url.service");
var NewsService = (function () {
    function NewsService(http, urlService) {
        this.http = http;
        this.urlService = urlService;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    NewsService.prototype.getNewsItems = function (newsItemId, dateFrom, dateTo) {
        var url = this.urlService.apiUrl() + '/NewsItems?';
        if (newsItemId != null) {
            url += 'id=' + newsItemId;
        }
        if (dateFrom != null) {
            url += '&dateFrom=' + dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + '-' + dateFrom.getDate();
        }
        if (dateTo != null) {
            url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate();
        }
        return Promise.resolve(this.http.get(url));
    };
    NewsService.prototype.putNewsItem = function (newsItem) {
        return Promise.resolve(this.http.put(this.urlService.apiUrl() + '/NewsItems', JSON.stringify(newsItem), { headers: this.headers }));
    };
    NewsService.prototype.postNewsItem = function (newsItem) {
        return Promise.resolve(this.http.post(this.urlService.apiUrl() + '/NewsItems', JSON.stringify(newsItem), { headers: this.headers }));
    };
    return NewsService;
}());
NewsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, url_service_1.UrlService])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map