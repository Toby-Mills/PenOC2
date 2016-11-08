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
var competitor_service_1 = require('../../services/competitor.service');
var competitor_model_1 = require('../../models/competitor.model');
//---------------------------------------------------------------------------------------
var CompetitorComponent = (function () {
    function CompetitorComponent(lookupService, competitorService) {
        this.lookupService = lookupService;
        this.competitorService = competitorService;
        this.peopleOnly = false;
        this.competitorIdChange = new core_1.EventEmitter();
        this.searchString = "";
        this.competitor = new competitor_model_1.CompetitorModel;
    }
    CompetitorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.competitorService.allCompetitors.subscribe(function (data) { return _this.allCompetitors = data; });
        this.lookupService.genderList.subscribe(function (data) { return _this.genderList = data; });
        this.loadCompetitor();
    };
    CompetitorComponent.prototype.loadCompetitor = function () {
        var _this = this;
        if (this.competitorId > 0) {
            this.competitorService.allCompetitors
                .subscribe(function (competitors) {
                if (competitors) {
                    _this.competitor = competitors.find(function (competitor) { return (competitor.id == _this.competitorId); });
                }
            });
        }
        else {
            this.competitor = null;
        }
    };
    CompetitorComponent.prototype.delayedActivateSearch = function (active) {
        var self;
        self = this;
        if (active) {
            clearTimeout(self.delayedHide);
            self.delayedDisplay = setTimeout(function () {
                if (!self.searchActive) {
                    self.activateSearch(true);
                }
            }, 300);
        }
        else {
            clearTimeout(self.delayedDisplay);
            self.delayedHide = setTimeout(function () {
                self.activateSearch(false);
            }, 500);
        }
    };
    CompetitorComponent.prototype.activateSearch = function (active) {
        if (active) {
            this.loadCompetitor();
            if (this.competitor) {
                this.searchString = this.competitor.fullName;
                this.lookupName(this.searchString);
            }
        }
        else {
            this.newCompetitor = null;
        }
        this.searchActive = active;
    };
    CompetitorComponent.prototype.lookupName = function (name) {
        this.matchIndex = -1;
    };
    CompetitorComponent.prototype.selectCompetitor = function (competitor) {
        this.competitor = competitor;
        this.competitorId = this.competitor.id;
        this.competitorIdChange.emit({ value: this.competitor });
        this.activateSearch(false);
    };
    CompetitorComponent.prototype.clearClicked = function (event) {
        if (event.detail == 1) {
            this.clearCompetitor();
        }
    };
    CompetitorComponent.prototype.clearCompetitor = function () {
        this.competitor = null;
        this.searchString = "";
        this.competitorIdChange.emit({ value: this.competitor });
    };
    CompetitorComponent.prototype.keyPressed = function (event) {
        var _this = this;
        if (event.key == "ArrowDown") {
            this.matchIndex++;
        }
        else if (event.key == "ArrowUp") {
            if (this.matchIndex > 0) {
                this.matchIndex--;
            }
        }
        else if (event.key == "Enter") {
            this.selectCompetitor(this.allCompetitors.filter(function (competitor) { return new RegExp(_this.searchString.toLowerCase()).test(competitor.fullName.toLowerCase()); })[this.matchIndex]);
        }
    };
    CompetitorComponent.prototype.newClicked = function () {
        this.newCompetitor = new competitor_model_1.CompetitorModel;
    };
    CompetitorComponent.prototype.cancelNewCompetitor = function () {
        this.newCompetitor = null;
    };
    CompetitorComponent.prototype.saveNewCompetitor = function () {
        var _this = this;
        if (this.newCompetitor.genderId == 3) {
            this.newCompetitor.firstName = '';
        }
        this.newCompetitor.fullName = (this.newCompetitor.firstName > "" ? this.newCompetitor.firstName + ' ' : '');
        this.newCompetitor.fullName = this.newCompetitor.fullName + this.newCompetitor.surname;
        this.competitorService.postCompetitor(this.newCompetitor).subscribe(function (data) {
            _this.selectCompetitor(data.json());
            _this.competitorService.getAllCompetitors();
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CompetitorComponent.prototype, "competitorId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CompetitorComponent.prototype, "peopleOnly", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CompetitorComponent.prototype, "competitorIdChange", void 0);
    CompetitorComponent = __decorate([
        core_1.Component({
            selector: 'competitor',
            templateUrl: './app/components/competitor/competitor.template.html',
            styleUrls: ['./app/components/competitor/competitor.style.css']
        }), 
        __metadata('design:paramtypes', [lookup_service_1.LookupService, competitor_service_1.CompetitorService])
    ], CompetitorComponent);
    return CompetitorComponent;
}());
exports.CompetitorComponent = CompetitorComponent;
//# sourceMappingURL=competitor.component.js.map