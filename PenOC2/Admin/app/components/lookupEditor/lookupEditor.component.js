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
var lookup_service_1 = require('../../services/lookup.service');
var venue_model_1 = require('../../models/venue.model');
var LookupEditorComponent = (function () {
    function LookupEditorComponent(lookupService) {
        this.lookupService = lookupService;
        this.tab = 'venues';
    }
    LookupEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lookupService.clubList.subscribe(function (data) { return _this.clubList = data; });
        this.lookupService.venueList.subscribe(function (data) { return _this.venueList = data; });
    };
    LookupEditorComponent.prototype.saveClub = function (club, shortName, fullName) {
        console.log(club);
        console.log(shortName);
        console.log(fullName);
        club.shortName = shortName;
        club.fullName = fullName;
        this.lookupService.putClub(club);
    };
    LookupEditorComponent.prototype.deleteClub = function (club) {
        this.lookupService.deleteClub(club.id);
    };
    LookupEditorComponent.prototype.saveVenue = function (venue, name) {
        venue.name = name;
        this.lookupService.putVenue(venue);
    };
    LookupEditorComponent.prototype.createVenue = function (name) {
        var venue = new venue_model_1.VenueModel();
        venue.name = name;
        this.lookupService.postVenue(venue);
    };
    LookupEditorComponent.prototype.deleteVenue = function (venue) {
        this.lookupService.deleteVenue(venue.id);
    };
    LookupEditorComponent = __decorate([
        core_1.Component({
            selector: 'lookup-editor',
            templateUrl: './app/components/lookupEditor/lookupEditor.template.html',
            styleUrls: ['./app/components/lookupEditor/lookupEditor.style.css']
        }), 
        __metadata('design:paramtypes', [lookup_service_1.LookupService])
    ], LookupEditorComponent);
    return LookupEditorComponent;
}());
exports.LookupEditorComponent = LookupEditorComponent;
//# sourceMappingURL=lookupEditor.component.js.map