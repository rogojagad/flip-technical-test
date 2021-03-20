import Disbursement from "../const/Disbursement";
import ReadDisbursementService from "~src/service/ReadDisbursementService";
import ReadUserService from "~src/service/ReadUserService";
import ReadBalanceService from "~src/service/ReadBalanceService";
import DisbursementHttpService from "~src/service/DisbursementHttpService";

class RetrySendDraftedDisbursementCommand {
  constructor() {
    this.readBalanceService = new ReadBalanceService();
    this.readDisbursementService = new ReadDisbursementService();
    this.readUserService = new ReadUserService();
    this.disbursementHttpService = new DisbursementHttpService();
  }

  async retrySendDraftedDisbursement() {
    const disbursements = await this.readDisbursementService.readManyByStatus(
      Disbursement.STATUS_PENDING
    );

    console.log(`Found ${disbursements.length} drafted disbursements`);

    const retryPromises = disbursements.map(async (disbursement) => {
      const disbursementId = disbursement[Disbursement.ATTRIBUTE_ID];
      const userId = disbursement[Disbursement.ATTRIBUTE_USER_ID];

      const user = await this.readUserService.readOneById(userId);
      const balance = await this.readBalanceService.readOneByUserId(userId);

      return this.disbursementHttpService.sendOneDisbursement(
        user,
        balance,
        disbursementId
      );
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
