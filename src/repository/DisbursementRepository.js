import Disbursement from "~src/const/Disbursement";
import db from "~src/entity/Firebase";

export default class DisbursementRepository {
  constructor() {
    this.db = db;
  }

  async createOne(fields) {
    const docRef = await (
      await this.db.collection(Disbursement.COLLECTION).add(fields)
    ).get();

    const id = docRef.id;
    const data = docRef.data();

    return { id, ...data };
  }

  async updateOne(id, fields) {
    return await this.db
      .collection(Disbursement.COLLECTION)
      .doc(id)
      .update(fields);
  }

  async readOneByTransactionId(transactionId) {
    return await this.db
      .collection(Disbursement.COLLECTION)
      .where(Disbursement.ATTRIBUTE_TRANSACTION_ID, "==", transactionId)
      .get();
  }
}
