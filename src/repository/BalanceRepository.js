import Balance from "~src/const/Balance";
import db from "~src/entity/Firebase";

export default class BalanceRepository {
  constructor() {
    this.db = db;
  }

  async readOneByUserId(userId) {
    return await this.db
      .collection(Balance.COLLECTION)
      .where(Balance.ATTRIBUTE_USER_ID, "==", userId)
      .get();
  }

  async createOne(fields) {
    const docRef = await (
      await this.db.collection(Balance.COLLECTION).add(fields)
    ).get();

    const id = docRef.id;
    const data = docRef.data();

    return { id, ...data };
  }
}
