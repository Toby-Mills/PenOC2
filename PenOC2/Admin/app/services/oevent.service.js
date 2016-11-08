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
var url_service_1 = require('../services/url.service');
var OEventService = (function () {
    function OEventService(http, urlService) {
        this.http = http;
        this.urlService = urlService;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    OEventService.prototype.getOEvent = function (oeventId, name, venue, dateFrom, dateTo) {
        var url = this.urlService.apiUrl() + '/OEvents?';
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
        return Promise.resolve(this.http.get(url));
    };
    OEventService.prototype.putOEvent = function (oevent) {
        return Promise.resolve(this.http.put(this.urlService.apiUrl() + '/OEvents/', JSON.stringify(oevent), { headers: this.headers }));
    };
    OEventService.prototype.postOEvent = function (oevent) {
        return Promise.resolve(this.http.post(this.urlService.apiUrl() + '/OEvents/', JSON.stringify(oevent), { headers: this.headers }));
    };
    OEventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, url_service_1.UrlService])
    ], OEventService);
    return OEventService;
}());
exports.OEventService = OEventService;
//# sourceMappingURL=oevent.service.js.map