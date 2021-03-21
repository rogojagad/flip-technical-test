import DisbursementResponse from "~src/const/DisbursementResponse";
import db from "~src/entity/Firebase";

export default class DisbursementRepository {
  constructor() {
    this.db = db;
  }

  async createOne(fields) {
    const docRef = await (
      await this.db.collection(DisbursementResponse.COLLECTION).add(fields)
    ).get();

    const id = docRef.id;
    const data = docRef.data();

    return { id, ...data };
  }

  async readAll() {
    return await this.db.collection(DisbursementResponse.COLLECTION).get();
  }
}
