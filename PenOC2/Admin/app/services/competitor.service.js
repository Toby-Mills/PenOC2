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
var http_1 = require("@angular/http");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var url_service_1 = require("../services/url.service");
var CompetitorService = (function () {
    function CompetitorService(http, urlService) {
        this.http = http;
        this.urlService = urlService;
        this.allCompetitors = new BehaviorSubject_1.BehaviorSubject(null);
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.getAllCompetitors();
    }
    CompetitorService.prototype.getCompetitor = function (competitorId, name) {
        var url = this.urlService.apiUrl() + '/Competitors?';
        if (competitorId != null) {
            url += 'idCompetitor=' + competitorId;
        }
        if (name != null) {
            url += '&name=' + name;
        }
        return Promise.resolve(this.http.get(url));
    };
    CompetitorService.prototype.getAllCompetitors = function () {
        var _this = this;
        this.getCompetitor().then(function (data) { return data.subscribe(function (competitorData) {
            var competitors;
            competitors = competitorData.json();
            competitors.sort(function (a, b) {
                if (a.genderId === 3 && b.genderId !== 3) {
                    return 1;
                }
                if (a.genderId !== 3 && b.genderId === 3) {
                    return -1;
                }
                if (a.fullName.toLowerCase() < b.fullName.toLowerCase()) {
                    return -1;
                }
                if (a.fullName.toLowerCase() === b.fullName.toLowerCase()) {
                    return 0;
                }
                if (a.fullName.toLowerCase() > b.fullName.toLowerCase()) {
                    return 1;
                }
            });
            _this.allCompetitors.next(competitors);
        }); });
    };
    CompetitorService.prototype.getIndividual = function (name) {
        var url = this.urlService.apiUrl() + '/Competitors/Individuals?';
        if (name != null) {
            url += '&name=' + name;
        }
        return Promise.resolve(this.http.get(url));
    };
    CompetitorService.prototype.putCompetitor = function (competitor) {
        return Promise.resolve(this.http.put(this.urlService.apiUrl() + '/Competitors/', JSON.stringify(competitor), { headers: this.headers }));
    };
    CompetitorService.prototype.postCompetitor = function (competitor) {
        var obs = this.http.post(this.urlService.apiUrl() + '/Competitors/', JSON.stringify(competitor), { headers: this.headers });
        this.getAllCompetitors();
        return obs;
    };
    return CompetitorService;
}());
CompetitorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, url_service_1.UrlService])
], CompetitorService);
exports.CompetitorService = CompetitorService;
//# sourceMappingURL=competitor.service.js.map