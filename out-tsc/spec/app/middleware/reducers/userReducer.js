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
var userActions_1 = require("../actions/userActions");
var user_1 = require("../../models/users/user");
var initialState = {
    user: user_1.empty_user
};
function userReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case userActions_1.GETUSER_RESPONSE:
            return __assign({}, state, { user: action.payload.user });
    }
    return state;
}
exports.userReducer = userReducer;
//# sourceMappingURL=userReducer.js.map