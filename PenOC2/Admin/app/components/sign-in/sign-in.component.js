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
var SignInComponent = (function () {
    function SignInComponent(apiService) {
        this.apiService = apiService;
        this.authenticationFailed = false;
        this.authenticating = false;
        this.authenticated = new core_1.EventEmitter;
    }
    SignInComponent.prototype.ngAfterViewInit = function () {
        this.userName.nativeElement.focus();
    };
    SignInComponent.prototype.signIn = function (userName, password) {
        var _this = this;
        this.authenticationFailed = false;
        this.authenticating = true;
        this.apiService.signIn(userName, password).subscribe(function (authenticated) {
            if (authenticated) {
                _this.authenticated.emit(true);
                _this.authenticating = false;
            }
        }, function (error) {
            _this.authenticationFailed = true;
            _this.authenticating = false;
        });
    };
    SignInComponent.prototype.signInClicked = function (userName, password) {
        this.signIn(userName, password);
    };
    SignInComponent.prototype.passwordKeyPressed = function (event, userName, password) {
        switch (event.key) {
            case 'Enter': this.signIn(userName, password);
        }
    };
    return SignInComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SignInComponent.prototype, "authenticated", void 0);
__decorate([
    core_1.ViewChild('userName'),
    __metadata("design:type", Object)
], SignInComponent.prototype, "userName", void 0);
SignInComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'sign-in',
        templateUrl: './sign-in.template.html',
        styleUrls: ['./sign-in.style.css']
    }),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], SignInComponent);
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=sign-in.component.js.map