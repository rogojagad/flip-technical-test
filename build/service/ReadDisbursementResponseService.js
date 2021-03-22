"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DisbursementResponseRepository = _interopRequireDefault(require("../repository/DisbursementResponseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReadDisbursementResponseService {
  constructor() {
    this.disbursementResponseRepository = new _DisbursementResponseRepository.default();
  }

  async readAll() {
    const responses = await this.disbursementResponseRepository.readAll();
    const results = new Array();
    responses.forEach(response => {
      const id = response.id;
      results.push({
        id,
        ...response.data()
      });
    });
    return results;
  }

}

exports.default = ReadDisbursementResponseService;
//# sourceMappingURL=ReadDisbursementResponseService.js.map