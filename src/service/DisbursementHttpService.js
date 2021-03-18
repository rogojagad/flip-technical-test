import Balance from "~src/const/Balance";
import DisbursementHttpRepository from "~src/repository/DisbursementHttpRepository";
import User from "~src/const/User";
import DisbursementPayload from "~src/const/DisbursementPayload";

export default class DisbursementHttpService {
  constructor() {
    this.disbursementHttpRepository = new DisbursementHttpRepository();
  }

  async sendOneDisbursement(user, balance, remark = null) {
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
}

run();

async function run() {
  const user = { account_number: "11111", bank_code: "BCA", name: "User 1" };
  const balance = { amount: 10000 };
  const s = new DisbursementHttpService();

  console.log(await s.sendOneDisbursement(user, balance));
}
