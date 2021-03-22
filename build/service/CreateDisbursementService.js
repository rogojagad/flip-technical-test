"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Balance = _interopRequireDefault(require("../const/Balance"));

var _Disbursement = _interopRequireDefault(require("../const/Disbursement"));

var _DisbursementHttpService = _interopRequireDefault(require("./DisbursementHttpService"));

var _DisbursementRepository = _interopRequireDefault(require("../repository/DisbursementRepository"));

var _ReadBalanceService = _interopRequireDefault(require("./ReadBalanceService"));

var _ReadUserService = _interopRequireDefault(require("./ReadUserService"));

var _User = _interopRequireDefault(require("../const/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateDisbursementService {
  constructor() {
    this.disbursementHttpService = new _DisbursementHttpService.default();
    this.disbursementRepository = new _DisbursementRepository.default();
    this.readBalanceService = new _ReadBalanceService.default();
    this.readUserService = new _ReadUserService.default();
  }

  async createOneByUserId(userId, remark) {
    const user = await this.readUserService.readOneById(userId);
    const balance = await this.readBalanceService.readOneByUserId(userId);
    const date = new Date();
    remark = remark ? remark : `DISBURSEMENT ${user[_User.default.ATTRIBUTE_NAME]} ${date}`;
    const disbursement = Object();
    disbursement[_Disbursement.default.ATTRIBUTE_CREATED_AT] = new Date();
    disbursement[_Disbursement.default.ATTRIBUTE_UPDATED_AT] = new Date();
    disbursement[_Disbursement.default.ATTRIBUTE_BANK_CODE] = user[_User.default.ATTRIBUTE_BANK_CODE];
    disbursement[_Disbursement.default.ATTRIBUTE_ACCOUNT_NUMBER] = user[_User.default.ATTRIBUTE_ACCOUNT_NUMBER];
    disbursement[_Disbursement.default.ATTRIBUTE_USER_ID] = userId;
    disbursement[_Disbursement.default.ATTRIBUTE_AMOUNT] = balance[_Balance.default.ATTRIBUTE_AMOUNT];
    disbursement[_Disbursement.default.ATTRIBUTE_STATUS] = _Disbursement.default.STATUS_DRAFT;
    disbursement[_Disbursement.default.ATTRIBUTE_REMARK] = remark;
    const disbursementRecord = await this.disbursementRepository.createOne(disbursement);
    this.disbursementHttpService.sendOneDisbursement(user, balance, disbursementRecord.id, remark);
    return disbursementRecord;
  }

}

exports.default = CreateDisbursementService;
//# sourceMappingURL=CreateDisbursementService.js.map