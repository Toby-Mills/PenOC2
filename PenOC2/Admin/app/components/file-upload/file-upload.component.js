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
var upload_service_1 = require("../../services/upload.service");
var FileUploadComponent = (function () {
    function FileUploadComponent(uploadService) {
        this.uploadService = uploadService;
        this.tagStyle = 'image';
    }
    FileUploadComponent.prototype.copy = function () {
        var range = document.createRange();
        var label = document.querySelector('#tagLabel');
        window.getSelection().removeAllRanges();
        range.selectNode(label);
        window.getSelection().addRange(range);
        try {
            // Now that we've selected the anchor text, execute the copy command  
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
        }
        catch (err) {
        }
        // Remove the selections - NOTE: Should use
        // removeRange(range) when it is supported  
        window.getSelection().removeAllRanges();
    };
    FileUploadComponent.prototype.addFile = function () {
        var _this = this;
        this.fi = this.fileInput.nativeElement;
        if (this.fi.files && this.fi.files[0]) {
            var fileToUpload = this.fi.files[0];
            this.uploadService
                .uploadNewsImage(fileToUpload)
                .subscribe(function (res) {
                _this.fileUrl = JSON.parse(res.text()).Url;
                _this.fi.value = '';
                if (_this.tagStyle === 'image') {
                    _this.tag = '<img src="' + _this.fileUrl + '" />';
                }
            });
        }
    };
    return FileUploadComponent;
}());
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", Object)
], FileUploadComponent.prototype, "fileInput", void 0);
__decorate([
    core_1.ViewChild('tagLabel'),
    __metadata("design:type", Object)
], FileUploadComponent.prototype, "tagLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUploadComponent.prototype, "tagStyle", void 0);
FileUploadComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'file-upload',
        templateUrl: './file-upload.template.html',
        styleUrls: ['./file-upload.style.css']
    }),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], FileUploadComponent);
exports.FileUploadComponent = FileUploadComponent;
//# sourceMappingURL=file-upload.component.js.map