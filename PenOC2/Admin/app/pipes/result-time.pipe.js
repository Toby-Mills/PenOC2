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
var ResultTimePipe = (function () {
    function ResultTimePipe() {
    }
    ResultTimePipe.prototype.transform = function (dateString) {
        var parsedString = Date.parse(dateString);
        var parsedDate = new Date();
        var returnString;
        if (isNaN(parsedString)) {
            return '';
        }
        else {
            parsedDate = new Date(parsedString);
            returnString = parsedDate.getUTCHours() + ':' + parsedDate.getMinutes() + ':' + parsedDate.getSeconds();
            return returnString;
        }
    };
    ResultTimePipe = __decorate([
        core_1.Pipe({ name: 'ResultTime' }), 
        __metadata('design:paramtypes', [])
    ], ResultTimePipe);
    return ResultTimePipe;
}());
exports.ResultTimePipe = ResultTimePipe;
//# sourceMappingURL=result-time.pipe.js.map