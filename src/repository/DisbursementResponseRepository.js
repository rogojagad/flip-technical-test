import DisbursementResponse from "@src/const/DisbursementResponse";
import db from "@src/entity/Firebase";

export default class DisbursementRepository {
  constructor() {
    this.db = db;
  }

  async createOne(fields) {
    return await this.db
      .collection(DisbursementResponse.COLLECTION)
      .add(fields);
  }
}
