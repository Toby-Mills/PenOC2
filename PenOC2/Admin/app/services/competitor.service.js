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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var api_service_1 = require("../services/api.service");
var CompetitorService = (function () {
    function CompetitorService(apiService) {
        this.apiService = apiService;
        this.allCompetitors = new BehaviorSubject_1.BehaviorSubject(null);
        this.getAllCompetitors();
    }
    CompetitorService.prototype.getCompetitor = function (competitorId, name) {
        var url = '/Competitors?';
        if (competitorId != null) {
            url += 'idCompetitor=' + competitorId;
        }
        if (name != null) {
            url += '&name=' + name;
        }
        return Promise.resolve(this.apiService.get(url));
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
        var url = '/Competitors/Individuals?';
        if (name != null) {
            url += '&name=' + name;
        }
        return Promise.resolve(this.apiService.get(url));
    };
    CompetitorService.prototype.putCompetitor = function (competitor) {
        return this.apiService.put('/Competitors/', JSON.stringify(competitor));
    };
    CompetitorService.prototype.postCompetitor = function (competitor) {
        return this.apiService.post('/Competitors/', JSON.stringify(competitor));
    };
    CompetitorService.prototype.deleteCompetitor = function (competitorId) {
        return this.apiService.delete('/Competitors/' + competitorId);
    };
    CompetitorService.prototype.mergeCompetitors = function (competitorId, mergeTargetId) {
        return this.apiService.put('/Competitors/' + competitorId + '/merge/' + mergeTargetId, undefined);
    };
    return CompetitorService;
}());
CompetitorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], CompetitorService);
exports.CompetitorService = CompetitorService;
//# sourceMappingURL=competitor.service.js.map