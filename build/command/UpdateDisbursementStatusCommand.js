"use strict";

var _Balance = _interopRequireDefault(require("../const/Balance"));

var _Disbursement = _interopRequireDefault(require("../const/Disbursement"));

var _DisbursementHttpService = _interopRequireDefault(require("../service/DisbursementHttpService"));

var _DisbursementResponse = _interopRequireDefault(require("../const/DisbursementResponse"));

var _ReadBalanceService = _interopRequireDefault(require("../service/ReadBalanceService"));

var _ReadDisbursementService = _interopRequireDefault(require("../service/ReadDisbursementService"));

var _UpdateBalanceService = _interopRequireDefault(require("../service/UpdateBalanceService"));

var _UpdateDisbursementService = _interopRequireDefault(require("../service/UpdateDisbursementService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateDisbursementStatusCommand {
  constructor() {
    this.disbursementHttpService = new _DisbursementHttpService.default();
    this.updateDisbursementService = new _UpdateDisbursementService.default();
    this.readDisbursementService = new _ReadDisbursementService.default();
    this.readBalanceService = new _ReadBalanceService.default();
    this.updateBalanceService = new _UpdateBalanceService.default();
  }

  async getAndUpdateDisbursementStatus(transactionId) {
    const result = await this.disbursementHttpService.getDisbursementStatusById(transactionId);
    const status = result[_DisbursementResponse.default.ATTRIBUTE_DATA][_DisbursementResponse.default.ATTRIBUTE_RESPONSE_STATUS];
    const isSuccess = status === _Disbursement.default.STATUS_SUCCESS;
    console.log(`Transaction ID ${transactionId} newest status is ${status}`);

    if (isSuccess) {
      const disbursementRecord = await this.readDisbursementService.readOneByTransactionId(transactionId);
      const userId = disbursementRecord[_Disbursement.default.ATTRIBUTE_USER_ID];
      const balanceRecord = await this.readBalanceService.readOneByUserId(userId);
      const newDisbursementStatusField = Object();
      newDisbursementStatusField[_Disbursement.default.ATTRIBUTE_STATUS] = status;
      await this.updateDisbursementService.updateOne(disbursementRecord[_Disbursement.default.ATTRIBUTE_ID], newDisbursementStatusField);
      const newBalanceField = Object();
      newBalanceField[_Balance.default.ATTRIBUTE_AMOUNT] = 0;
      await this.updateBalanceService.updateOne(balanceRecord[_Balance.default.ATTRIBUTE_ID], newBalanceField);
    }

    console.log(`Done updating disbursement status for Transaction ID ${transactionId}`);
  }

}

async function run() {
  const transactionId = process.argv[2];

  if (transactionId) {
    console.log(`Updating disbursement status for Transaction ID ${transactionId}`);
    const updateDisbursementStatusCommand = new UpdateDisbursementStatusCommand();
    updateDisbursementStatusCommand.getAndUpdateDisbursementStatus(transactionId);
  } else {
    console.log("Please provide Transaction ID");
  }
}

run();
//# sourceMappingURL=UpdateDisbursementStatusCommand.js.map