import Balance from "~src/const/Balance";
import db from "~src/entity/Firebase";

export default class BalanceRepository {
  constructor() {
    this.db = db;
  }

  async readOneByUserId(userId) {
    const docRef = (
      await this.db
        .collection(Balance.COLLECTION)
        .where(Balance.ATTRIBUTE_USER_ID, "==", userId)
        .get()
    ).docs[0];

    const id = docRef.id;
    const data = docRef.data();

    if (data) {
      return { id, ...data };
    }

    return null;
  }

  async createOne(fields) {
    const docRef = await (
      await this.db.collection(Balance.COLLECTION).add(fields)
    ).get();

    const id = docRef.id;
    const data = docRef.data();

    return { id, ...data };
  }

  async updateOne(id, fields) {
    return await this.db.collection(Balance.COLLECTION).doc(id).update(fields);
  }
}
