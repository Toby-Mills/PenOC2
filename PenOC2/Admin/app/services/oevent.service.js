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
var api_service_1 = require("../services/api.service");
var OEventService = (function () {
    function OEventService(apiService) {
        this.apiService = apiService;
    }
    OEventService.prototype.getOEvent = function (oeventId, name, venue, dateFrom, dateTo) {
        var url = '/OEvents?';
        if (oeventId != null) {
            url += 'id=' + oeventId;
        }
        if (name != null) {
            url += '&name=' + name;
        }
        if (venue != null) {
            url += '&venue=' + venue;
        }
        if (dateFrom != null) {
            url += '&dateFrom=' + dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + '-' + dateFrom.getDate();
        }
        if (dateTo != null) {
            url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate();
        }
        return Promise.resolve(this.apiService.get(url));
    };
    OEventService.prototype.putOEvent = function (oevent) {
        return Promise.resolve(this.apiService.put('/OEvents/', JSON.stringify(oevent)));
    };
    OEventService.prototype.postOEvent = function (oevent) {
        return Promise.resolve(this.apiService.post('/OEvents/', JSON.stringify(oevent)));
    };
    return OEventService;
}());
OEventService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], OEventService);
exports.OEventService = OEventService;
//# sourceMappingURL=oevent.service.js.map