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
var lookup_service_1 = require("../../services/lookup.service");
var competitor_service_1 = require("../../services/competitor.service");
var competitor_model_1 = require("../../models/competitor.model");
var CompetitorEditorComponent = (function () {
    function CompetitorEditorComponent(competitorService, lookupService) {
        this.competitorService = competitorService;
        this.lookupService = lookupService;
        this.saved = new core_1.EventEmitter();
        this.cancelled = new core_1.EventEmitter();
        this.mode = 'edit';
    }
    CompetitorEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lookupService.genderList.subscribe(function (data) { return _this.genderList = data; });
    };
    CompetitorEditorComponent.prototype.saveClicked = function () {
        var _this = this;
        if (this.competitor.id > 0) {
            this.competitorService.putCompetitor(this.competitor)
                .subscribe(function (data) {
                _this.competitorService.getAllCompetitors();
                _this.saved.emit();
            });
        }
        else {
            this.competitorService.postCompetitor(this.competitor)
                .subscribe(function (data) {
                _this.competitorService.getAllCompetitors();
                _this.saved.emit();
            });
        }
    };
    CompetitorEditorComponent.prototype.modalClicked = function (event) {
        if (event.srcElement.id === 'divModalBackground') {
            this.cancel();
        }
        ;
    };
    CompetitorEditorComponent.prototype.cancelClicked = function () {
        this.cancel();
    };
    CompetitorEditorComponent.prototype.cancel = function () {
        this.cancelled.emit();
    };
    CompetitorEditorComponent.prototype.mergeModeClicked = function (event) {
        event.preventDefault();
        this.mode = 'merge';
    };
    CompetitorEditorComponent.prototype.mergeClicked = function () {
        var _this = this;
        if (this.mergeTarget.id > 0) {
            this.competitorService.mergeCompetitors(this.competitor.id, this.mergeTarget.id)
                .subscribe(function (data) {
                _this.mode = 'edit';
                _this.competitor = undefined;
                _this.competitorService.getAllCompetitors();
            });
        }
    };
    CompetitorEditorComponent.prototype.mergeTargetKeyPressed = function (mergeTargetId) {
        var _this = this;
        this.mergeTarget = undefined;
        if (mergeTargetId > 0) {
            this.competitorService.getCompetitor(mergeTargetId).then(function (res) {
                res.subscribe(function (data) {
                    _this.mergeTarget = data.json()[0];
                });
            });
        }
    };
    return CompetitorEditorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", competitor_model_1.CompetitorModel)
], CompetitorEditorComponent.prototype, "competitor", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CompetitorEditorComponent.prototype, "saved", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CompetitorEditorComponent.prototype, "cancelled", void 0);
CompetitorEditorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'competitor-editor',
        templateUrl: './competitor-editor.template.html',
        styleUrls: ['./competitor-editor.style.css']
    }),
    __metadata("design:paramtypes", [competitor_service_1.CompetitorService, lookup_service_1.LookupService])
], CompetitorEditorComponent);
exports.CompetitorEditorComponent = CompetitorEditorComponent;
//# sourceMappingURL=competitor-editor.component.js.map