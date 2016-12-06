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
var oevent_service_1 = require('../../services/oevent.service');
var router_1 = require('@angular/router');
var OEventListComponent = (function () {
    function OEventListComponent(oeventService, router) {
        this.oeventService = oeventService;
        this.router = router;
        this.dateRangeList = ['Current', 'All', 'Past', 'Last 6 months', 'Next 6 months', 'Future'];
    }
    OEventListComponent.prototype.ngOnInit = function () {
        this.searchDateRange = 'Current';
        this.searchOEvents();
    };
    OEventListComponent.prototype.searchOEvents = function () {
        var _this = this;
        var searchDateFrom;
        var searchDateTo;
        switch (this.searchDateRange) {
            case 'Current':
                searchDateFrom = new Date();
                searchDateFrom.setDate(searchDateFrom.getDate() - 60);
                searchDateTo = new Date();
                searchDateTo.setDate(searchDateTo.getDate() + 180);
                break;
            case 'All':
                searchDateFrom = null;
                searchDateTo = null;
                break;
            case 'Past':
                searchDateFrom = null;
                searchDateTo = new Date();
                break;
            case 'Last 6 months':
                searchDateFrom = new Date();
                searchDateFrom.setDate(searchDateFrom.getDate() - (6 * 31));
                searchDateTo = new Date();
                break;
            case 'Next 6 months':
                searchDateFrom = new Date();
                searchDateTo = new Date();
                searchDateTo.setDate(searchDateTo.getDate() + (6 * 31));
                break;
            case 'Future':
                searchDateFrom = new Date();
                searchDateTo = null;
                break;
            default:
                searchDateFrom = null;
                searchDateTo = null;
                break;
        }
        this.oeventService.getOEvent(null, this.searchName, this.searchVenue, searchDateFrom, searchDateTo)
            .then(function (data) {
            data.subscribe(function (oeventData) {
                _this.oeventList = oeventData.json();
            });
        });
    };
    OEventListComponent.prototype.dateRangeChange = function (event) {
        this.searchDateRange = event.target.value;
        this.searchOEvents();
    };
    OEventListComponent.prototype.oeventClick = function (oeventId) {
        this.router.navigate(['/events', oeventId]);
    };
    OEventListComponent.prototype.newOEvent = function () {
        this.router.navigate(['/events', '0']);
    };
    OEventListComponent = __decorate([
        core_1.Component({
            selector: 'oevent-list',
            templateUrl: './app/components/oeventList/oeventList.template.html',
            styleUrls: ['./app/components/oeventList/oeventList.style.css']
        }), 
        __metadata('design:paramtypes', [oevent_service_1.OEventService, router_1.Router])
    ], OEventListComponent);
    return OEventListComponent;
}());
exports.OEventListComponent = OEventListComponent;
//# sourceMappingURL=oeventList.component.js.map