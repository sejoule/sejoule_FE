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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var fileAction = require("../../middleware/actions/fileActions");
var UploadComponent = /** @class */ (function () {
    function UploadComponent(store) {
        this.store = store;
        this.files = new Set();
    }
    UploadComponent.prototype.ngOnInit = function () { };
    UploadComponent.prototype.addFileDialog = function () {
        this.fileElement.nativeElement.click();
    };
    UploadComponent.prototype.filesAdded = function () {
        var files = this.fileElement.nativeElement.files;
        for (var key in files) {
            if (!isNaN(parseInt(key, 10))) {
                this.files.add(files[key]);
            }
        }
    };
    UploadComponent.prototype.upload = function () {
        var _this = this;
        this.files.forEach(function (file_to_upload) {
            var formData = new FormData();
            formData.append('file', file_to_upload, file_to_upload.name);
            _this.store.dispatch(new fileAction.UploadfileAction({
                action: fileAction.UPLOADFILE,
                file: formData,
                token: _this.getUsrToken
            }));
        });
    };
    Object.defineProperty(UploadComponent.prototype, "getUsrToken", {
        get: function () {
            var token = '';
            this.store.select('appReducer').subscribe(function (event) { return token = event['token']; });
            return token;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild('file'),
        __metadata("design:type", Object)
    ], UploadComponent.prototype, "fileElement", void 0);
    UploadComponent = __decorate([
        core_1.Component({
            selector: 'app-upload',
            templateUrl: './upload.component.html',
            styleUrls: ['./upload.component.scss']
        }),
        __metadata("design:paramtypes", [store_1.Store])
    ], UploadComponent);
    return UploadComponent;
}());
exports.UploadComponent = UploadComponent;
//# sourceMappingURL=upload.component.js.map