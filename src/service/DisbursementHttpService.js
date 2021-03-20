import Balance from "~src/const/Balance";
import Disbursement from "~src/const/Disbursement";
import DisbursementHttpRepository from "~src/repository/DisbursementHttpRepository";
import DisbursementPayload from "~src/const/DisbursementPayload";
import DisbursementResponse from "~src/const/DisbursementResponse";
import UpdateDisbursementService from "~src/service/UpdateDisbursementService";
import User from "~src/const/User";

export default class DisbursementHttpService {
  constructor() {
    this.disbursementHttpRepository = new DisbursementHttpRepository();
    this.updateDisbursementService = new UpdateDisbursementService();
  }

  async sendOneDisbursement(user, balance, disbursementId, remark) {
    const payload = Object();

    payload[DisbursementPayload.ATTRIBUTE_ACCOUNT_NUMBER] =
      user[User.ATTRIBUTE_ACCOUNT_NUMBER];
    payload[DisbursementPayload.ATTRIBUTE_BANK_CODE] =
      user[User.ATTRIBUTE_BANK_CODE];
    payload[DisbursementPayload.ATTRIBUTE_AMOUNT] =
      balance[Balance.ATTRIBUTE_AMOUNT];
    payload[DisbursementPayload.ATTRIBUTE_REMARK] = remark;

    const result = await this.disbursementHttpRepository.sendDisbursement(
      payload
    );
    const transactionId =
      result[DisbursementResponse.ATTRIBUTE_DATA][
        DisbursementResponse.ATTRIBUTE_ID
      ];
    const status =
      result[DisbursementResponse.ATTRIBUTE_DATA][
        DisbursementResponse.ATTRIBUTE_RESPONSE_STATUS
      ];

    const disbursementUpdatedField = Object();
    disbursementUpdatedField[
      Disbursement.ATTRIBUTE_TRANSACTION_ID
    ] = transactionId;
    disbursementUpdatedField[Disbursement.ATTRIBUTE_STATUS] = status;

    this.updateDisbursementService.updateOne(
      disbursementId,
      disbursementUpdatedField
    );

    return result;
  }

  async getDisbursementStatusById(disbursementId) {
    const result = this.disbursementHttpRepository.getDisbursementStatus(
      disbursementId
    );

    return result;
  }
}
