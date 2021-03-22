"use strict";

var _Disbursement = _interopRequireDefault(require("../const/Disbursement"));

var _ReadDisbursementService = _interopRequireDefault(require("../service/ReadDisbursementService"));

var _ReadUserService = _interopRequireDefault(require("../service/ReadUserService"));

var _ReadBalanceService = _interopRequireDefault(require("../service/ReadBalanceService"));

var _DisbursementHttpService = _interopRequireDefault(require("../service/DisbursementHttpService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RetrySendDraftedDisbursementCommand {
  constructor() {
    this.readBalanceService = new _ReadBalanceService.default();
    this.readDisbursementService = new _ReadDisbursementService.default();
    this.readUserService = new _ReadUserService.default();
    this.disbursementHttpService = new _DisbursementHttpService.default();
  }

  async retrySendDraftedDisbursement() {
    const disbursements = await this.readDisbursementService.readManyByStatus(_Disbursement.default.STATUS_PENDING);
    console.log(`Found ${disbursements.length} drafted disbursements`);
    const retryPromises = disbursements.map(async disbursement => {
      const disbursementId = disbursement[_Disbursement.default.ATTRIBUTE_ID];
      const userId = disbursement[_Disbursement.default.ATTRIBUTE_USER_ID];
      const user = await this.readUserService.readOneById(userId);
      const balance = await this.readBalanceService.readOneByUserId(userId);
      return this.disbursementHttpService.sendOneDisbursement(user, balance, disbursementId);
    });
    return retryPromises;
  }

}

async function run() {
  const command = new RetrySendDraftedDisbursementCommand();
  const retryPromises = await command.retrySendDraftedDisbursement();

  try {
    Promise.all(retryPromises);
  } catch (error) {
    console.log(error);
  }
}

run();
//# sourceMappingURL=RetrySendDraftedDisbursementCommand.js.map