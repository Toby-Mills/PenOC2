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
var competitor_model_1 = require("../../models/competitor.model");
var competitor_service_1 = require("../../services/competitor.service");
var router_1 = require("@angular/router");
var CompetitorListComponent = (function () {
    function CompetitorListComponent(competitorService, router) {
        this.competitorService = competitorService;
        this.router = router;
    }
    CompetitorListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.competitorService.allCompetitors.subscribe(function (data) {
            _this.allCompetitors = data;
            console.log('updated');
        });
    };
    CompetitorListComponent.prototype.editCompetitor = function (competitorId) {
        var _this = this;
        this.competitorService.getCompetitor(competitorId).then(function (data) { return data.subscribe(function (competitorData) {
            _this.editingCompetitor = competitorData.json()[0];
        }); });
    };
    CompetitorListComponent.prototype.competitorSaved = function () {
        this.editingCompetitor = undefined;
    };
    CompetitorListComponent.prototype.editCancelled = function () {
        this.editingCompetitor = undefined;
    };
    CompetitorListComponent.prototype.newCompetitor = function () {
        this.editingCompetitor = new competitor_model_1.CompetitorModel();
    };
    CompetitorListComponent.prototype.deleteCompetitor = function (competitorId) {
        var _this = this;
        console.log('delete');
        this.competitorService.deleteCompetitor(competitorId).subscribe(function (data) { _this.competitorService.getAllCompetitors(); });
    };
    return CompetitorListComponent;
}());
CompetitorListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'competitor-list',
        templateUrl: './competitor-list.template.html',
        styleUrls: ['./competitor-list.style.css']
    }),
    __metadata("design:paramtypes", [competitor_service_1.CompetitorService, router_1.Router])
], CompetitorListComponent);
exports.CompetitorListComponent = CompetitorListComponent;
//# sourceMappingURL=competitor-list.component.js.map