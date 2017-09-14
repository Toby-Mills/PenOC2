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
require("rxjs/Rx");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var api_service_1 = require("../services/api.service");
var LookupService = (function () {
    function LookupService(apiService) {
        this.apiService = apiService;
        this.genderList = new BehaviorSubject_1.BehaviorSubject(null);
        this.technicalDifficultyList = new BehaviorSubject_1.BehaviorSubject(null);
        this.clubList = new BehaviorSubject_1.BehaviorSubject(null);
        this.venueList = new BehaviorSubject_1.BehaviorSubject(null);
        this.getGenderList();
        this.getTechnicalDifficultyList();
        this.getClubList();
        this.getVenueList();
    }
    LookupService.prototype.getVenueList = function () {
        var _this = this;
        return Promise.resolve(this.apiService.get('/Venues')).then(function (data) { return data.subscribe(function (response) {
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
        return Promise.resolve(this.apiService.get('/Clubs')).then(function (data) { return data.subscribe(function (response) {
            var clubData = response.json();
            clubData.sort(function (a, b) {
                if (a.shortName === null) {
                    a.shortName = '';
                }
                ;
                if (b.shortName === null) {
                    b.shortName = '';
                }
                ;
                if (a.shortName.toLowerCase() < b.shortName.toLowerCase()) {
                    return -1;
                }
                ;
                if (a.shortName.toLowerCase() > b.shortName.toLowerCase()) {
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
        return Promise.resolve(this.apiService.post('/Clubs', JSON.stringify(club))).then(function (data) {
            data.subscribe(function (response) {
                _this.getClubList();
            });
        }).then(function (data) { return true; });
    };
    LookupService.prototype.putClub = function (club) {
        var _this = this;
        return Promise.resolve(this.apiService.put('/Clubs', JSON.stringify(club))).then(function (data) {
            data.subscribe(function (response) {
                _this.getClubList();
            });
        }).then(function (success) { return true; });
    };
    LookupService.prototype.deleteClub = function (clubId) {
        var _this = this;
        return Promise.resolve(this.apiService.delete('/Clubs/' + clubId)).then(function (data) {
            data.subscribe(function (response) {
                _this.getClubList();
            });
        }).then(function (success) { return true; });
    };
    LookupService.prototype.postVenue = function (venue) {
        var _this = this;
        return Promise.resolve(this.apiService.post('/Venues', JSON.stringify(venue))).then(function (data) {
            data.subscribe(function (response) {
                _this.getVenueList();
            });
        }).then(function (data) { return true; });
    };
    LookupService.prototype.putVenue = function (venue) {
        var _this = this;
        return Promise.resolve(this.apiService.put('/Venues', JSON.stringify(venue))).then(function (data) {
            data.subscribe(function (response) {
                _this.getVenueList();
            });
        }).then(function (success) { return true; });
    };
    LookupService.prototype.deleteVenue = function (venueId) {
        var _this = this;
        return Promise.resolve(this.apiService.delete('/Venues/' + venueId)).then(function (data) {
            data.subscribe(function (response) {
                _this.getVenueList();
            });
        }).then(function (success) { return true; });
    };
    LookupService.prototype.getTechnicalDifficultyList = function () {
        var _this = this;
        return Promise.resolve(this.apiService.get('/TechnicalDifficulties')).then(function (data) { return data.subscribe(function (technicalDifficultyData) {
            _this.technicalDifficultyList.next(technicalDifficultyData.json());
        }); }).then(function (success) { return true; });
    };
    LookupService.prototype.getGenderList = function () {
        var _this = this;
        return Promise.resolve(this.apiService.get('/Genders')).then(function (data) { return data.subscribe(function (genderData) {
            _this.genderList.next(genderData.json());
        }); }).then(function (success) { return true; });
    };
    return LookupService;
}());
LookupService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], LookupService);
exports.LookupService = LookupService;
//# sourceMappingURL=lookup.service.js.map