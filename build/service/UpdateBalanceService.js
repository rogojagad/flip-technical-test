"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BalanceRepository = _interopRequireDefault(require("../repository/BalanceRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReadUserService {
  constructor() {
    this.balanceRepository = new _BalanceRepository.default();
  }

  async updateOne(id, fields) {
    return await this.balanceRepository.updateOne(id, fields);
  }

}

exports.default = ReadUserService;
//# sourceMappingURL=UpdateBalanceService.js.map