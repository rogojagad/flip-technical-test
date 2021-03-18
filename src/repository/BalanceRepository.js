import Balance from "~src/const/Balance";
import db from "~src/entity/Firebase";

export default class BalanceRepository {
  constructor() {
    this.db = db;
  }

  async readOneByUserId(userId) {
    return await this.db
      .collection(Balance.COLLECTION)
      .where(Balance.ATTRIBUTE_USER_ID, userId)
      .get();
  }

  async createOne(fields) {
    return await this.db.collection(Balance.COLLECTION).add(fields);
  }
}
