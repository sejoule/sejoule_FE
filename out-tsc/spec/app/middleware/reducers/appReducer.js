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
var appActions_1 = require("../actions/appActions");
var user_1 = require("../../models/users/user");
var initialState = {
    login_state: false,
    authuser: user_1.empty_authuser,
    token: ''
};
function appReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case appActions_1.LOGIN_RESPONSE:
            return __assign({}, state, { login_state: state.login_state ? state.login_state : action.payload.success, authuser: action.payload.authuser, token: action.payload.token });
        case appActions_1.LOGOUT_RESPONSE:
            return __assign({}, state, { login_state: !state.login_state ? state.login_state : !action.payload.success, authuser: action.payload.authuser, token: action.payload.token });
    }
    return state;
}
exports.appReducer = appReducer;
//# sourceMappingURL=appReducer.js.map