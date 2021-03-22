"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DisbursementRepository = _interopRequireDefault(require("../repository/DisbursementRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateDisbursementService {
  constructor() {
    this.disbursementRepository = new _DisbursementRepository.default();
  }

  async updateOne(id, fields) {
    return await this.disbursementRepository.updateOne(id, fields);
  }

}

exports.default = UpdateDisbursementService;
//# sourceMappingURL=UpdateDisbursementService.js.map