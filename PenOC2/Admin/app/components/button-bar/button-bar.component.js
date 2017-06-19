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
var ButtonBarComponent = (function () {
    function ButtonBarComponent() {
        this.nextText = 'Next >';
        this.newText = 'New';
        this.editing = false;
        this.buttons = [];
        this.valid = true;
        this.backClicked = new core_1.EventEmitter;
        this.nextClicked = new core_1.EventEmitter;
        this.newClicked = new core_1.EventEmitter;
        this.saveClicked = new core_1.EventEmitter;
        this.cancelClicked = new core_1.EventEmitter;
    }
    ButtonBarComponent.prototype.backRequest = function () {
        this.backClicked.emit({});
    };
    ButtonBarComponent.prototype.nextRequest = function () {
        this.nextClicked.emit({});
    };
    ButtonBarComponent.prototype.saveRequest = function (event) {
        event.stopPropagation();
        this.saveClicked.emit({});
    };
    ButtonBarComponent.prototype.cancelRequest = function (event) {
        event.stopPropagation();
        this.cancelClicked.emit({});
    };
    ButtonBarComponent.prototype.newRequest = function () {
        this.newClicked.emit({});
    };
    return ButtonBarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonBarComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonBarComponent.prototype, "nextText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonBarComponent.prototype, "newText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ButtonBarComponent.prototype, "editing", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ButtonBarComponent.prototype, "buttons", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ButtonBarComponent.prototype, "valid", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ButtonBarComponent.prototype, "backClicked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ButtonBarComponent.prototype, "nextClicked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ButtonBarComponent.prototype, "newClicked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ButtonBarComponent.prototype, "saveClicked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ButtonBarComponent.prototype, "cancelClicked", void 0);
ButtonBarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'button-bar',
        templateUrl: './button-bar.template.html',
        styleUrls: ['./button-bar.style.css']
    })
], ButtonBarComponent);
exports.ButtonBarComponent = ButtonBarComponent;
//# sourceMappingURL=button-bar.component.js.map