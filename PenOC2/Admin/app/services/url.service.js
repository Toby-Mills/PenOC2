"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UrlService = (function () {
    function UrlService() {
    }
    UrlService.prototype.apiUrl = function () {
        if (location.host.toLowerCase().startsWith("localhost")) {
            return "http://localhost/penoc2/api";
        }
        else {
            return "http://www.penoc.org.za/api";
        }
    };
    return UrlService;
}());
UrlService = __decorate([
    core_1.Injectable()
], UrlService);
exports.UrlService = UrlService;
//# sourceMappingURL=url.service.js.map