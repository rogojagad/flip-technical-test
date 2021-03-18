import Balance from "~src/const/Balance";
import DisbursementHttpRepository from "~src/repository/DisbursementHttpRepository";
import User from "~src/const/User";
import DisbursementPayload from "~src/const/DisbursementPayload";

export default class DisbursementHttpService {
  constructor() {
    this.disbursementHttpRepository = new DisbursementHttpRepository();
  }

  async sendOneDisbursement(user, balance, remark = "") {
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

    return result;
  }
}
