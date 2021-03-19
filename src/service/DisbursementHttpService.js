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

  async sendOneDisbursement(user, balance, disbursementId, remark = null) {
    const payload = Object();
    const date = new Date();
    remark = remark
      ? remark
      : `DISBURSEMENT ${user[User.ATTRIBUTE_NAME]} ${date}`;

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

    const transactionIdField = Object();
    transactionIdField[Disbursement.ATTRIBUTE_TRANSACTION_ID] = transactionId;

    this.updateDisbursementService.updateOne(
      disbursementId,
      transactionIdField
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
