"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = isAuthenticated;

var _Auth = _interopRequireDefault(require("../const/Auth"));

var _ResponseFactory = _interopRequireDefault(require("../factory/ResponseFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function isAuthenticated(req, res, next) {
  const responseFactory = new _ResponseFactory.default();
  const sessionUserId = req.session[_Auth.default.SESSION_KEY_USER_ID];
  const sessionUserName = req.session[_Auth.default.SESSION_KEY_USER_NAME];
  const isAuthenticated = sessionUserId && sessionUserName;

  if (isAuthenticated) {
    return next();
  }

  return responseFactory.responseUnauthorized(res, {
    message: "Please do login first"
  });
}
//# sourceMappingURL=IsAuthenticated.js.map