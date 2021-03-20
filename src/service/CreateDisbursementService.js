import Balance from "~src/const/Balance";
import Disbursement from "~src/const/Disbursement";
import DisbursementHttpService from "~src/service/DisbursementHttpService";
import DisbursementRepository from "~src/repository/DisbursementRepository";
import ReadBalanceService from "~src/service/ReadBalanceService";
import ReadUserService from "~src/service/ReadUserService";
import User from "~src/const/User";

export default class CreateDisbursementService {
  constructor() {
    this.disbursementHttpService = new DisbursementHttpService();
    this.disbursementRepository = new DisbursementRepository();
    this.readBalanceService = new ReadBalanceService();
    this.readUserService = new ReadUserService();
  }

  async createOneByUserId(userId, remark) {
    const user = await this.readUserService.readOneById(userId);
    const balance = await this.readBalanceService.readOneByUserId(userId);
    const date = new Date();
    remark = remark
      ? remark
      : `DISBURSEMENT ${user[User.ATTRIBUTE_NAME]} ${date}`;

    const disbursement = Object();
    disbursement[Disbursement.ATTRIBUTE_CREATED_AT] = new Date();
    disbursement[Disbursement.ATTRIBUTE_UPDATED_AT] = new Date();
    disbursement[Disbursement.ATTRIBUTE_BANK_CODE] =
      user[User.ATTRIBUTE_BANK_CODE];
    disbursement[Disbursement.ATTRIBUTE_ACCOUNT_NUMBER] =
      user[User.ATTRIBUTE_ACCOUNT_NUMBER];
    disbursement[Disbursement.ATTRIBUTE_USER_ID] = userId;
    disbursement[Disbursement.ATTRIBUTE_AMOUNT] =
      balance[Balance.ATTRIBUTE_AMOUNT];
    disbursement[Disbursement.ATTRIBUTE_STATUS] = Disbursement.STATUS_DRAFT;
    disbursement[Disbursement.ATTRIBUTE_REMARK] = remark;

    const disbursementRecord = await this.disbursementRepository.createOne(
      disbursement
    );

    this.disbursementHttpService.sendOneDisbursement(
      user,
      balance,
      disbursementRecord.id,
      remark
    );

    return disbursementRecord;
  }
}
