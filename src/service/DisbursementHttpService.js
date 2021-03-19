import Balance from "~src/const/Balance";
import DisbursementHttpRepository from "~src/repository/DisbursementHttpRepository";
import User from "~src/const/User";
import DisbursementPayload from "~src/const/DisbursementPayload";

export default class DisbursementHttpService {
  constructor() {
    this.disbursementHttpRepository = new DisbursementHttpRepository();
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

    return result;
  }

  async getDisbursementStatusById(disbursementId) {
    const result = this.disbursementHttpRepository.getDisbursementStatus(
      disbursementId
    );

    return result;
  }
}
