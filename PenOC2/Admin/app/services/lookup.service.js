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
require("rxjs/Rx");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var url_service_1 = require("../services/url.service");
var LookupService = (function () {
    function LookupService(http, urlService) {
        this.http = http;
        this.urlService = urlService;
        this.genderList = new BehaviorSubject_1.BehaviorSubject(null);
        this.technicalDifficultyList = new BehaviorSubject_1.BehaviorSubject(null);
        this.clubList = new BehaviorSubject_1.BehaviorSubject(null);
        this.venueList = new BehaviorSubject_1.BehaviorSubject(null);
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.getGenderList();
        this.getTechnicalDifficultyList();
        this.getClubList();
        this.getVenueList();
    }
    LookupService.prototype.getVenueList = function () {
        var _this = this;
        return Promise.resolve(this.http.get(this.urlService.apiUrl() + '/Venues')).then(function (data) { return data.subscribe(function (response) {
            var venueData = response.json();
            venueData.sort(function (a, b) {
                if (a.name === null) {
                    a.name = '';
                }
                ;
                if (b.name === null) {
                    b.name = '';
                }
                ;
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                ;
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                ;
                return 0;
            });
            _this.venueList.next(venueData);
        }); }).then(function (success) { return true; });
    };
    LookupService.prototype.getClubList = function () {
        var _this = this;
        return Promise.resolve(this.http.get(this.urlService.apiUrl() + '/Clubs')).then(function (data) { return data.subscribe(function (response) {
            var clubData = response.json();
            clubData.sort(function (a, b) {
                if (a.shortName < b.shortName) {
                    return -1;
                }
                ;
                if (a.shortName > b.shortName) {
                    return 1;
                }
                ;
                return 0;
            });
            _this.clubList.next(clubData);
        }); }).then(function (success) { return true; });
    };
    LookupService.prototype.postClub = function (club) {
        var _this = this;
        return Promise.resolve(this.http.post(this.urlService.apiUrl() + '/Clubs', JSON.stringify(club), { headers: this.headers })).then(function (data) {
            data.subscribe(function (response) {
                _this.getClubList();
            });
        }).then(function (data) { return true; });
    };
    LookupService.prototype.putClub = function (club) {
        var _this = this;
        return Promise.resolve(this.http.put(this.urlService.apiUrl() + '/Clubs', JSON.stringify(club), { headers: this.headers })).then(function (data) {
            data.subscribe(function (response) {
                _this.getClubList();
            });
        }).then(function (success) { return true; });
    };
    LookupService.prototype.deleteClub = function (clubId) {
        var _this = this;
        return Promise.resolve(this.http.delete(this.urlService.apiUrl() + ' /Clubs/' + clubId)).then(function (data) {
            data.subscribe(function (response) {
                _this.getClubList();
            });
        }).then(function (success) { return true; });
    };
    LookupService.prototype.postVenue = function (venue) {
        var _this = this;
        return Promise.resolve(this.http.post(this.urlService.apiUrl() + '/Venues', JSON.stringify(venue), { headers: this.headers })).then(function (data) {
            data.subscribe(function (response) {
                _this.getVenueList();
            });
        }).then(function (data) { return true; });
    };
    LookupService.prototype.putVenue = function (venue) {
        var _this = this;
        return Promise.resolve(this.http.put(this.urlService.apiUrl() + '/Venues', JSON.stringify(venue), { headers: this.headers })).then(function (data) {
            data.subscribe(function (response) {
                _this.getVenueList();
            });
        }).then(function (success) { return true; });
    };
    LookupService.prototype.deleteVenue = function (venueId) {
        var _this = this;
        return Promise.resolve(this.http.delete(this.urlService.apiUrl() + '/Venues/' + venueId)).then(function (data) {
            data.subscribe(function (response) {
                _this.getVenueList();
            });
        }).then(function (success) { return true; });
    };
    LookupService.prototype.getTechnicalDifficultyList = function () {
        var _this = this;
        return Promise.resolve(this.http.get(this.urlService.apiUrl() + '/TechnicalDifficulties')).then(function (data) { return data.subscribe(function (technicalDifficultyData) {
            _this.technicalDifficultyList.next(technicalDifficultyData.json());
        }); }).then(function (success) { return true; });
    };
    LookupService.prototype.getGenderList = function () {
        var _this = this;
        return Promise.resolve(this.http.get(this.urlService.apiUrl() + '/Genders')).then(function (data) { return data.subscribe(function (genderData) {
            _this.genderList.next(genderData.json());
        }); }).then(function (success) { return true; });
    };
    return LookupService;
}());
LookupService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, url_service_1.UrlService])
], LookupService);
exports.LookupService = LookupService;
//# sourceMappingURL=lookup.service.js.map