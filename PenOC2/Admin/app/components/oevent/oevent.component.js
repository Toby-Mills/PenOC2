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
var oevent_model_1 = require('../../models/oevent.model');
var oevent_service_1 = require('../../services/oevent.service');
var router_1 = require('@angular/router');
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
        this.route.params.forEach(function (params) {
            var id = +params['eventId'];
            if (id > 0) {
                _this.oeventService.getOEvent(id).then(function (data) {
                    data.subscribe(function (eventData) {
                        _this.oevent = eventData.json()[0];
                        _this.oevent.date = new Date(_this.oevent.date).toISOString().substring(0, 10);
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
        this.router.navigate(["/events", this.oevent.id, "courses"]);
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
        this.oeventService.putOEvent(this.oevent)
            .then(function (data) {
            data.subscribe();
        });
    };
    OEventComponent.prototype.createOEvent = function () {
        this.oeventService.postOEvent(this.oevent)
            .then(function (data) {
            data.subscribe();
        });
    };
    OEventComponent = __decorate([
        core_1.Component({
            selector: 'oevent',
            templateUrl: './app/components/oevent/oevent.template.html',
            styleUrls: ['./app/components/oevent/oevent.style.css']
        }), 
        __metadata('design:paramtypes', [lookup_service_1.LookupService, oevent_service_1.OEventService, router_1.Router, router_1.ActivatedRoute])
    ], OEventComponent);
    return OEventComponent;
}());
exports.OEventComponent = OEventComponent;
//# sourceMappingURL=oevent.component.js.map