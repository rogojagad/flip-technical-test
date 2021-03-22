"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserRepository = _interopRequireDefault(require("../repository/UserRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReadUserService {
  constructor() {
    this.userRepository = new _UserRepository.default();
  }

  async readOneById(idParam) {
    return await this.userRepository.readOneById(idParam);
  }

  async readAll() {
    const users = await this.userRepository.readAll();
    const results = new Array();
    users.forEach(user => {
      const id = user.id;
      results.push({
        id,
        ...user.data()
      });
    });
    return results;
  }

}

exports.default = ReadUserService;
//# sourceMappingURL=ReadUserService.js.map