import Balance from "~src/const/Balance";
import Disbursement from "~src/const/Disbursement";
import DisbursementRepository from "~src/repository/DisbursementRepository";
import ReadBalanceService from "~src/service/ReadBalanceService";
import ReadUserService from "~src/service/ReadUserService";
import User from "~src/const/User";

export default class CreateDisbursementService {
  constructor() {
    this.disbursementRepository = new DisbursementRepository();
    this.readUserService = new ReadUserService();
    this.readBalanceService = new ReadBalanceService();
  }

  async createOneDisbursementByUserId(userId) {
    const user = await this.readUserService.readOneById(userId);
    const balance = await this.readBalanceService.readOneByUserId(userId);

    const disbursement = Object();
    disbursement[Disbursement.ATTRIBUTE_BANK_CODE] =
      user[User.ATTRIBUTE_BANK_CODE];
    disbursement[Disbursement.ATTRIBUTE_ACCOUNT_NUMBER] =
      user[User.ATTRIBUTE_ACCOUNT_NUMBER];
    disbursement[Disbursement.ATTRIBUTE_USER_ID] = userId;
    disbursement[Disbursement.ATTRIBUTE_AMOUNT] =
      balance[Balance.ATTRIBUTE_AMOUNT];
    disbursement[Disbursement.ATTRIBUTE_STATUS] = Disbursement.STATUS_PENDING;

    await this.disbursementRepository.createOne(disbursement);
  }
}
