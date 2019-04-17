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
var ModalMessageBoxComponent = (function () {
    function ModalMessageBoxComponent() {
        this.okClicked = new core_1.EventEmitter();
        this.cancelClicked = new core_1.EventEmitter();
        this.visible = false;
    }
    ModalMessageBoxComponent.prototype.display = function () {
        this.visible = true;
    };
    ModalMessageBoxComponent.prototype.modalClicked = function (event) {
        if (event.srcElement.id === 'divModalBackground') {
            this.cancelButtonClicked();
        }
        ;
    };
    ModalMessageBoxComponent.prototype.okButtonClicked = function () {
        this.okClicked.emit();
        this.visible = false;
    };
    ModalMessageBoxComponent.prototype.cancelButtonClicked = function () {
        this.cancelClicked.emit();
        this.visible = false;
    };
    return ModalMessageBoxComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalMessageBoxComponent.prototype, "titleText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalMessageBoxComponent.prototype, "messageText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalMessageBoxComponent.prototype, "okButtonText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalMessageBoxComponent.prototype, "cancelButtonText", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ModalMessageBoxComponent.prototype, "okClicked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ModalMessageBoxComponent.prototype, "cancelClicked", void 0);
ModalMessageBoxComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'modal-message-box',
        templateUrl: './modal-message-box.template.html',
        styleUrls: ['./modal-message-box.style.css']
    })
], ModalMessageBoxComponent);
exports.ModalMessageBoxComponent = ModalMessageBoxComponent;
//# sourceMappingURL=modal-message-box.component.js.map