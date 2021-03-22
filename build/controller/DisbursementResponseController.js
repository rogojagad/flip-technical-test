"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ReadDisbursementResponseService = _interopRequireDefault(require("../service/ReadDisbursementResponseService"));

var _ResponseFactory = _interopRequireDefault(require("../factory/ResponseFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DisbursementResponseController {
  constructor() {
    this.readDisbursementResponseService = new _ReadDisbursementResponseService.default();
    this.responseFactory = new _ResponseFactory.default();
  }

  async readAll(res) {
    const responses = await this.readDisbursementResponseService.readAll();
    return this.responseFactory.responseOk(res, responses);
  }

}

exports.default = DisbursementResponseController;
//# sourceMappingURL=DisbursementResponseController.js.map