import DisbursementResponse from "~src/const/DisbursementResponse";
import DisbursementHttpService from "~src/service/DisbursementHttpService";
import Disbursement from "../const/Disbursement";
import UpdateDisbursementService from "~src/service/UpdateDisbursementService";
import ReadDisbursementService from "~src/service/ReadDisbursementService";
import ReadBalanceService from "~src/service/ReadBalanceService";
import UpdateBalanceService from "~src/service/UpdateBalanceService";
import Balance from "../const/Balance";

class UpdateDisbursementStatusCommand {
  constructor() {
    this.disbursementHttpService = new DisbursementHttpService();
    this.updateDisbursementService = new UpdateDisbursementService();
    this.readDisbursementService = new ReadDisbursementService();
    this.readBalanceService = new ReadBalanceService();
    this.updateBalanceService = new UpdateBalanceService();
  }

  async getAndUpdateDisbursementStatus(transactionId) {
    const result = await this.disbursementHttpService.getDisbursementStatusById(
      transactionId
    );
    const status =
      result[DisbursementResponse.ATTRIBUTE_DATA][
        DisbursementResponse.ATTRIBUTE_RESPONSE_STATUS
      ];
    const isSuccess = status === Disbursement.STATUS_SUCCESS;

    console.log(`Transaction ID ${transactionId} newest status is ${status}`);

    if (isSuccess) {
      const disbursementRecord = await this.readDisbursementService.readOneByTransactionId(
        transactionId
      );
      const userId = disbursementRecord[Disbursement.ATTRIBUTE_USER_ID];
      const balanceRecord = await this.readBalanceService.readOneByUserId(
        userId
      );

      const newDisbursementStatusField = Object();
      newDisbursementStatusField[Disbursement.ATTRIBUTE_STATUS] = status;

      await this.updateDisbursementService.updateOne(
        disbursementRecord[Disbursement.ATTRIBUTE_ID],
        newDisbursementStatusField
      );

      const newBalanceField = Object();
      newBalanceField[Balance.ATTRIBUTE_AMOUNT] = 0;

      await this.updateBalanceService.updateOne(
        balanceRecord[Balance.ATTRIBUTE_ID],
        newBalanceField
      );
    }

    console.log(
      `Done updating disbursement status for Transaction ID ${transactionId}`
    );
  }
}

async function run() {
  const transactionId = process.argv[2];

  if (transactionId) {
    console.log(
      `Updating disbursement status for Transaction ID ${transactionId}`
    );
    const updateDisbursementStatusCommand = new UpdateDisbursementStatusCommand();
    updateDisbursementStatusCommand.getAndUpdateDisbursementStatus(
      transactionId
    );
  } else {
    console.log("Please provide disbursement ID");
  }
}

run();
