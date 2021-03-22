"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DisbursementResponseRepository = _interopRequireDefault(require("../repository/DisbursementResponseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateDisbursementResponseService {
  constructor() {
    this.disbursementResponseRepository = new _DisbursementResponseRepository.default();
  }

  async createOne(fields) {
    return await this.disbursementResponseRepository.createOne(fields);
  }

}

exports.default = CreateDisbursementResponseService;
//# sourceMappingURL=CreateDisbursementResponseService.js.map