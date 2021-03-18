import User from "@src/const/User";
import db from "@src/entity/Firebase";

export default class UserRepository {
  constructor() {
    this.db = db;
  }

  async createOne(fields) {
    return await db.collection(User.COLLECTION).add(fields);
  }
}
