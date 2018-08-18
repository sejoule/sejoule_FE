"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appReducer_1 = require("./appReducer");
var userReducer_1 = require("./userReducer");
var fileReducer_1 = require("./fileReducer"); // notice
// export interface UserState {
//   userReducer: UserReducerState;
// }
exports.reducers = {
    appReducer: appReducer_1.appReducer,
    userReducer: userReducer_1.userReducer,
    fileReducer: fileReducer_1.fileReducer,
    fileProgressReducer: fileReducer_1.fileProgressReducer
};
// export const userReducers: ActionReducerMap<UserState> = {
//   userReducer: userReducer
// };
//# sourceMappingURL=index.js.map