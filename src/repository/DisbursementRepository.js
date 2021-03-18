import Disbursement from "@src/const/Disbursement";
import db from "@src/entity/Firebase";

export default class DisbursementRepository {
  constructor() {
    this.db = db;
  }

  async createOne(fields) {
    return await this.db.collection(Disbursement.COLLECTION).add(fields);
  }
}
