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
var api_service_1 = require("../services/api.service");
var NewsService = (function () {
    function NewsService(apiService) {
        this.apiService = apiService;
    }
    NewsService.prototype.getNewsItems = function (newsItemId, dateFrom, dateTo) {
        var url = '/NewsItems?';
        if (newsItemId != null) {
            url += 'id=' + newsItemId;
        }
        if (dateFrom != null) {
            url += '&dateFrom=' + dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + '-' + dateFrom.getDate();
        }
        if (dateTo != null) {
            url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate();
        }
        return Promise.resolve(this.apiService.get(url));
    };
    NewsService.prototype.putNewsItem = function (newsItem) {
        return Promise.resolve(this.apiService.put('/NewsItems', JSON.stringify(newsItem)));
    };
    NewsService.prototype.postNewsItem = function (newsItem) {
        return Promise.resolve(this.apiService.post('/NewsItems', JSON.stringify(newsItem)));
    };
    return NewsService;
}());
NewsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map