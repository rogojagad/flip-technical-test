import DisbursementResponse from "~src/const/DisbursementResponse";
import DisbursementHttpService from "~src/service/DisbursementHttpService";
import Disbursement from "../const/Disbursement";
import UpdateDisbursementService from "~src/service/UpdateDisbursementService";
import ReadDisbursementService from "~src/service/ReadDisbursementService";

class UpdateDisbursementStatusCommand {
  constructor() {
    this.disbursementHttpService = new DisbursementHttpService();
    this.updateDisbursementService = new UpdateDisbursementService();
    this.readDisbursementService = new ReadDisbursementService();
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

      const newDisbursementStatusField = Object();
      newDisbursementStatusField[Disbursement.ATTRIBUTE_STATUS] = status;

      this.updateDisbursementService.updateOne(
        disbursementRecord[Disbursement.ATTRIBUTE_ID],
        newDisbursementStatusField
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
