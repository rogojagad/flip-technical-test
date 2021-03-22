"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Balance = _interopRequireDefault(require("../const/Balance"));

var _Disbursement = _interopRequireDefault(require("../const/Disbursement"));

var _DisbursementHttpRepository = _interopRequireDefault(require("../repository/DisbursementHttpRepository"));

var _DisbursementPayload = _interopRequireDefault(require("../const/DisbursementPayload"));

var _DisbursementResponse = _interopRequireDefault(require("../const/DisbursementResponse"));

var _UpdateDisbursementService = _interopRequireDefault(require("./UpdateDisbursementService"));

var _CreateDisbursementResponseService = _interopRequireDefault(require("./CreateDisbursementResponseService"));

var _User = _interopRequireDefault(require("../const/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DisbursementHttpService {
  constructor() {
    this.createDisbursementResponseService = new _CreateDisbursementResponseService.default();
    this.disbursementHttpRepository = new _DisbursementHttpRepository.default();
    this.updateDisbursementService = new _UpdateDisbursementService.default();
  }

  async sendOneDisbursement(user, balance, disbursementId, remark) {
    const payload = Object();
    payload[_DisbursementPayload.default.ATTRIBUTE_ACCOUNT_NUMBER] = user[_User.default.ATTRIBUTE_ACCOUNT_NUMBER];
    payload[_DisbursementPayload.default.ATTRIBUTE_BANK_CODE] = user[_User.default.ATTRIBUTE_BANK_CODE];
    payload[_DisbursementPayload.default.ATTRIBUTE_AMOUNT] = balance[_Balance.default.ATTRIBUTE_AMOUNT];
    payload[_DisbursementPayload.default.ATTRIBUTE_REMARK] = remark;
    const result = await this.disbursementHttpRepository.sendDisbursement(payload);
    const transactionId = result[_DisbursementResponse.default.ATTRIBUTE_DATA][_DisbursementResponse.default.ATTRIBUTE_ID];
    const status = result[_DisbursementResponse.default.ATTRIBUTE_DATA][_DisbursementResponse.default.ATTRIBUTE_RESPONSE_STATUS];
    const disbursementUpdatedField = Object();
    disbursementUpdatedField[_Disbursement.default.ATTRIBUTE_TRANSACTION_ID] = transactionId;
    disbursementUpdatedField[_Disbursement.default.ATTRIBUTE_STATUS] = status;
    this.updateDisbursementService.updateOne(disbursementId, disbursementUpdatedField);
    this.createDisbursementResponseService.createOne(result[_DisbursementResponse.default.ATTRIBUTE_DATA]);
    return result;
  }

  async getDisbursementStatusById(disbursementId) {
    const result = this.disbursementHttpRepository.getDisbursementStatus(disbursementId);
    return result;
  }

}

exports.default = DisbursementHttpService;
//# sourceMappingURL=DisbursementHttpService.js.map