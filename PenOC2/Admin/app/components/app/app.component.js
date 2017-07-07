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
var api_service_1 = require("../../services/api.service");
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(router, apiService) {
        this.router = router;
        this.apiService = apiService;
        this.isAuthenticated = false;
        this.authenticationFailed = false;
    }
    AppComponent.prototype.signInClicked = function (userName, password) {
        var _this = this;
        this.apiService.signIn(userName, password).subscribe(function (authenticated) {
            _this.isAuthenticated = authenticated;
            if (authenticated) {
                _this.authenticationFailed = false;
                setTimeout(function (auth, theRouter) {
                    theRouter.navigate(['events']);
                }, 0, authenticated, _this.router);
            }
        }, function (error) {
            _this.authenticationFailed = true;
        });
    };
    AppComponent.prototype.signOutClicked = function (event) {
        event.preventDefault();
        this.apiService.signOut();
        this.isAuthenticated = false;
        this.router.navigate(['']);
    };
    AppComponent.prototype.homeClicked = function () {
        this.router.navigate(['']);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: './app.template.html',
        styleUrls: ['./app.style.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, api_service_1.ApiService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map