"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Auth = _interopRequireDefault(require("../const/Auth"));

var _CreateDisbursementService = _interopRequireDefault(require("../service/CreateDisbursementService"));

var _DisbursementQueryParam = _interopRequireDefault(require("../const/DisbursementQueryParam"));

var _ReadDisbursementService = _interopRequireDefault(require("../service/ReadDisbursementService"));

var _ResponseFactory = _interopRequireDefault(require("../factory/ResponseFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DisbursementController {
  constructor() {
    this.createDisbursementService = new _CreateDisbursementService.default();
    this.readDisbursementService = new _ReadDisbursementService.default();
    this.responseFactory = new _ResponseFactory.default();
  }

  async createOne(requestBody, req, res) {
    const userId = req.session[_Auth.default.SESSION_KEY_USER_ID];
    const remark = requestBody[_DisbursementQueryParam.default.REMARK];

    if (userId) {
      const disbursement = await this.createDisbursementService.createOneByUserId(userId, remark);
      return this.responseFactory.responseCreated(res, disbursement);
    }

    return this.responseFactory.responseBadRequest(res);
  }

  async readManyByUserId(userId, res) {
    const disbursements = await this.readDisbursementService.readManyByUserId(userId);
    return this.responseFactory.responseOk(res, disbursements);
  }

}

exports.default = DisbursementController;
//# sourceMappingURL=DisbursementController.js.map