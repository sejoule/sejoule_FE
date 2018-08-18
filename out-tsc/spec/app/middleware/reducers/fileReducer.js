"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fileActions_1 = require("../actions/fileActions");
var initialState = {
    fileState: false,
    file: ''
};
var initialProgressState = {
    fileUploads: []
};
function fileReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case fileActions_1.FILE_RESPONSE:
            return __assign({}, state, { fileState: action.payload.success ? action.payload.success : false, file: action.payload.filename });
    }
    return state;
}
exports.fileReducer = fileReducer;
function fileProgressReducer(state, action) {
    if (state === void 0) { state = initialProgressState; }
    switch (action.type) {
        case fileActions_1.FILE_PROGRESS:
            var key = action.payload.filename;
            var newItem = { filename: key, percent_upload: action.payload.percent_upload };
            return __assign({}, state, { fileUploads: state.fileUploads.indexOf(newItem) > 0 ? state.fileUploads.concat([{ filename: key, percent_upload: action.payload.percent_upload }]) : state.fileUploads.splice(0, 1, {}).slice() });
    }
}
exports.fileProgressReducer = fileProgressReducer;
//# sourceMappingURL=fileReducer.js.map