"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Effects
exports.LOGINOUT = 'LOGINOUT';
exports.LOGOUT = 'LOGOUT';
exports.LOGIN = 'LOGIN';
exports.LOGIN_RESPONSE = 'LOGIN_RESPONSE';
exports.LOGOUT_RESPONSE = 'LOGOUT_RESPONSE';
// Alerts
exports.ALERT = 'AlertAction';
//
var LoginAction = /** @class */ (function () {
    function LoginAction(payload) {
        this.payload = payload;
        this.type = exports.LOGINOUT;
    }
    return LoginAction;
}());
exports.LoginAction = LoginAction;
var LogoutAction = /** @class */ (function () {
    function LogoutAction(payload) {
        this.payload = payload;
        this.type = exports.LOGINOUT;
    }
    return LogoutAction;
}());
exports.LogoutAction = LogoutAction;
var LoginResponse = /** @class */ (function () {
    function LoginResponse(payload) {
        this.payload = payload;
        this.type = exports.LOGIN_RESPONSE;
    }
    return LoginResponse;
}());
exports.LoginResponse = LoginResponse;
var LogOutResponse = /** @class */ (function () {
    function LogOutResponse(payload) {
        this.payload = payload;
        this.type = exports.LOGOUT_RESPONSE;
    }
    return LogOutResponse;
}());
exports.LogOutResponse = LogOutResponse;
var AlertAction = /** @class */ (function () {
    function AlertAction(payload) {
        this.payload = payload;
        this.type = exports.ALERT;
    }
    return AlertAction;
}());
exports.AlertAction = AlertAction;
//# sourceMappingURL=appActions.js.map