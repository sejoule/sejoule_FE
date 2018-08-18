"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Effects
exports.GETUSERPROFILE = 'GETUSERPROFILE';
exports.GETUSER_RESPONSE = 'GETUSER_RESPONSE';
var GetUserProfileAction = /** @class */ (function () {
    function GetUserProfileAction(payload) {
        this.payload = payload;
        this.type = exports.GETUSERPROFILE;
    }
    return GetUserProfileAction;
}());
exports.GetUserProfileAction = GetUserProfileAction;
var GetUserResponse = /** @class */ (function () {
    function GetUserResponse(payload) {
        this.payload = payload;
        this.type = exports.GETUSER_RESPONSE;
    }
    return GetUserResponse;
}());
exports.GetUserResponse = GetUserResponse;
//# sourceMappingURL=userActions.js.map