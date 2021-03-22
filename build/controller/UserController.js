"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ReadBalanceService = _interopRequireDefault(require("../service/ReadBalanceService"));

var _ReadUserService = _interopRequireDefault(require("../service/ReadUserService"));

var _ResponseFactory = _interopRequireDefault(require("../factory/ResponseFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  constructor() {
    this.readBalanceService = new _ReadBalanceService.default();
    this.readUserService = new _ReadUserService.default();
    this.responseFactory = new _ResponseFactory.default();
  }

  async readAll(res) {
    const users = await this.readUserService.readAll();
    return this.responseFactory.responseOk(res, users);
  }

  async readOneByUserId(userId, res) {
    let user = await this.readUserService.readOneById(userId);

    if (user) {
      let balance = await this.readBalanceService.readOneByUserId(userId);
      const {
        amount
      } = balance;
      user = {
        balance: {
          amount
        },
        ...user
      };
      return this.responseFactory.responseOk(res, user);
    }

    return this.responseFactory.responseNotFound(res);
  }

}

exports.default = UserController;
//# sourceMappingURL=UserController.js.map