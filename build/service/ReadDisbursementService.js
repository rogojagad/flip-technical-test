"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DisbursementRepository = _interopRequireDefault(require("../repository/DisbursementRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReadDisbursementService {
  constructor() {
    this.disbursementRepository = new _DisbursementRepository.default();
  }

  async readOneByTransactionId(transactionId) {
    transactionId = parseInt(transactionId);
    return await this.disbursementRepository.readOneByTransactionId(transactionId);
  }

  async readManyByUserId(userId) {
    return await this.disbursementRepository.readManyByUserId(userId);
  }

  async readManyByStatus(status) {
    return await this.disbursementRepository.readManyByStatus(status);
  }

}

exports.default = ReadDisbursementService;
//# sourceMappingURL=ReadDisbursementService.js.map