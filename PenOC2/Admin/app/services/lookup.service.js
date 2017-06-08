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
var http_1 = require('@angular/http');
require('rxjs/Rx');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var url_service_1 = require('../services/url.service');
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
        Promise.resolve(this.http.get(this.urlService.apiUrl() + '/Venues')).then(function (data) { return data.subscribe(function (venueData) {
            _this.venueList.next(venueData.json());
        }); });
    };
    LookupService.prototype.getClubList = function () {
        var _this = this;
        Promise.resolve(this.http.get(this.urlService.apiUrl() + '/Clubs')).then(function (data) { return data.subscribe(function (clubData) {
            _this.clubList.next(clubData.json());
        }); });
    };
    LookupService.prototype.postClub = function (club) {
        var _this = this;
        Promise.resolve(this.http.post(this.urlService.apiUrl() + '/Clubs', JSON.stringify(club), { headers: this.headers })).then(function (data) {
            data.subscribe(function (response) {
                _this.getClubList();
            });
        });
    };
    LookupService.prototype.putClub = function (club) {
        var _this = this;
        Promise.resolve(this.http.put(this.urlService.apiUrl() + '/Clubs', JSON.stringify(club), { headers: this.headers })).then(function (data) {
            data.subscribe(function (response) {
                _this.getClubList();
            });
        });
    };
    LookupService.prototype.deleteClub = function (clubId) {
        var _this = this;
        Promise.resolve(this.http.delete(this.urlService.apiUrl() + ' /Clubs/' + clubId)).then(function (data) {
            data.subscribe(function (response) {
                _this.getClubList();
            });
        });
    };
    LookupService.prototype.postVenue = function (venue) {
        var _this = this;
        Promise.resolve(this.http.post(this.urlService.apiUrl() + '/Venues', JSON.stringify(venue), { headers: this.headers })).then(function (data) {
            data.subscribe(function (response) {
                _this.getVenueList();
            });
        });
    };
    LookupService.prototype.putVenue = function (venue) {
        var _this = this;
        console.log(venue.name);
        console.log('put Venue:' + this.urlService.apiUrl() + '/Venues');
        Promise.resolve(this.http.put(this.urlService.apiUrl() + '/Venues', JSON.stringify(venue), { headers: this.headers })).then(function (data) {
            data.subscribe(function (response) {
                _this.getVenueList();
            });
        });
    };
    LookupService.prototype.deleteVenue = function (venueId) {
        var _this = this;
        Promise.resolve(this.http.delete(this.urlService.apiUrl() + '/Venues/' + venueId)).then(function (data) {
            data.subscribe(function (response) {
                _this.getVenueList();
            });
        });
    };
    LookupService.prototype.getTechnicalDifficultyList = function () {
        var _this = this;
        Promise.resolve(this.http.get(this.urlService.apiUrl() + '/TechnicalDifficulties')).then(function (data) { return data.subscribe(function (technicalDifficultyData) {
            _this.technicalDifficultyList.next(technicalDifficultyData.json());
        }); });
    };
    LookupService.prototype.getGenderList = function () {
        var _this = this;
        Promise.resolve(this.http.get(this.urlService.apiUrl() + '/Genders')).then(function (data) { return data.subscribe(function (genderData) {
            _this.genderList.next(genderData.json());
        }); });
    };
    LookupService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, url_service_1.UrlService])
    ], LookupService);
    return LookupService;
}());
exports.LookupService = LookupService;
//# sourceMappingURL=lookup.service.js.map