import User from "@src/const/User";
import db from "@src/entity/Firebase";

export default class UserRepository {
  constructor() {
    this.db = db;
  }

  async createOne(id, fields) {
    return await db.collection(User.COLLECTION).doc(id).set(fields);
  }
}
