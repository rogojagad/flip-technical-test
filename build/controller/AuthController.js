"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Auth = _interopRequireDefault(require("../const/Auth"));

var _User = _interopRequireDefault(require("../const/User"));

var _ResponseFactory = _interopRequireDefault(require("../factory/ResponseFactory"));

var _ReadUserService = _interopRequireDefault(require("../service/ReadUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthController {
  constructor() {
    this.readUserService = new _ReadUserService.default();
    this.responseFactory = new _ResponseFactory.default();
  }

  async login(reqBody, req, res) {
    const username = reqBody[_Auth.default.QUERY_USERNAME];
    const password = reqBody[_Auth.default.QUERY_PASSWORD];

    if (username && password) {
      const user = await this.readUserService.readOneById(username);

      if (user) {
        req.session[_Auth.default.SESSION_KEY_USER_ID] = user[_User.default.ATTRIBUTE_ID];
        req.session[_Auth.default.SESSION_KEY_USER_NAME] = user[_User.default.ATTRIBUTE_NAME];
        return this.responseFactory.responseOk(res, user);
      }

      return this.responseFactory.responseNotFound(res, {
        message: `User with ID ${username} not found`
      });
    }

    return this.responseFactory.responseBadRequest(res, {
      message: "Username or Password not given"
    });
  }

}

exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map