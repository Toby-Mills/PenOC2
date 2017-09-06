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
var lookup_service_1 = require("../../../penoc-sdk/services/lookup.service");
var oevent_model_1 = require("../../../penoc-sdk/models/oevent.model");
var oevent_service_1 = require("../../../penoc-sdk/services/oevent.service");
var router_1 = require("@angular/router");
var OEventComponent = (function () {
    function OEventComponent(lookupService, oeventService, router, route) {
        this.lookupService = lookupService;
        this.oeventService = oeventService;
        this.router = router;
        this.route = route;
    }
    OEventComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lookupService.venueList.subscribe(function (venueData) { return _this.venueList = venueData; });
        this.lookupService.clubList.subscribe(function (clubData) { return _this.clubList = clubData; });
        this.loadOEvent();
    };
    OEventComponent.prototype.loadOEvent = function () {
        var _this = this;
        var oEventDate;
        this.route.params.forEach(function (params) {
            var id = +params['eventId'];
            if (id > 0) {
                _this.oeventService.getOEvent(id).then(function (data) {
                    data.subscribe(function (eventData) {
                        _this.oevent = eventData.json()[0];
                        oEventDate = new Date(_this.oevent.date);
                        // add 2 hours (in milliseconds) for South African Time Zone
                        oEventDate.setTime(oEventDate.getTime() + 2 * 60 * 60 * 1000);
                        // truncate to only the date portion
                        _this.oevent.date = oEventDate.toISOString().substring(0, 10);
                    });
                });
            }
            else {
                _this.oevent = new oevent_model_1.OEventModel();
            }
        });
    };
    OEventComponent.prototype.saveClicked = function () {
        this.upsertOEvent();
    };
    OEventComponent.prototype.cancelClicked = function () {
        this.loadOEvent();
    };
    OEventComponent.prototype.coursesClicked = function () {
        this.router.navigate(['/events', this.oevent.id, 'courses']);
    };
    OEventComponent.prototype.plannerSelected = function (planner) {
        if (planner) {
            this.oevent.plannerId = planner.id;
        }
        else {
            this.oevent.plannerId = null;
        }
    };
    ;
    OEventComponent.prototype.controllerSelected = function (controller) {
        if (controller) {
            this.oevent.controllerId = controller.id;
        }
        else {
            this.oevent.controllerId = null;
        }
    };
    ;
    OEventComponent.prototype.upsertOEvent = function () {
        if (this.oevent.id > 0) {
            this.saveOEvent();
        }
        else {
            this.createOEvent();
        }
    };
    OEventComponent.prototype.saveOEvent = function () {
        var _this = this;
        this.oeventService.putOEvent(this.oevent)
            .then(function (data) {
            data.subscribe(function (result) {
                _this.loadOEvent();
            });
        });
    };
    OEventComponent.prototype.createOEvent = function () {
        var _this = this;
        this.oeventService.postOEvent(this.oevent)
            .then(function (data) {
            data.subscribe(function (result) {
                _this.loadOEvent();
            });
        });
    };
    return OEventComponent;
}());
OEventComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'oevent',
        templateUrl: './oevent.template.html',
        styleUrls: ['./oevent.style.css']
    }),
    __metadata("design:paramtypes", [lookup_service_1.LookupService,
        oevent_service_1.OEventService,
        router_1.Router,
        router_1.ActivatedRoute])
], OEventComponent);
exports.OEventComponent = OEventComponent;
//# sourceMappingURL=oevent.component.js.map