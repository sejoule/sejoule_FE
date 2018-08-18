"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Effects
exports.UPLOADFILE = 'UPLOADFILE';
exports.FILE_RESPONSE = 'FILE_RESPONSE';
exports.FILE_PROGRESS = 'FILE_PROGRESS';
var UploadfileAction = /** @class */ (function () {
    function UploadfileAction(payload) {
        this.payload = payload;
        this.type = exports.UPLOADFILE;
    }
    return UploadfileAction;
}());
exports.UploadfileAction = UploadfileAction;
var UploadfileResponse = /** @class */ (function () {
    function UploadfileResponse(payload) {
        this.payload = payload;
        this.type = exports.FILE_RESPONSE;
    }
    return UploadfileResponse;
}());
exports.UploadfileResponse = UploadfileResponse;
var UploadfileProgress = /** @class */ (function () {
    function UploadfileProgress(payload) {
        this.payload = payload;
        this.type = exports.FILE_PROGRESS;
    }
    return UploadfileProgress;
}());
exports.UploadfileProgress = UploadfileProgress;
//# sourceMappingURL=fileActions.js.map