"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BalanceRepository = _interopRequireDefault(require("../repository/BalanceRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReadBalanceService {
  constructor() {
    this.balanceRepository = new _BalanceRepository.default();
  }

  async readOneByUserId(userId) {
    return await this.balanceRepository.readOneByUserId(userId);
  }

}

exports.default = ReadBalanceService;
//# sourceMappingURL=ReadBalanceService.js.map