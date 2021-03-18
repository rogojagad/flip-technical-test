import User from "~src/const/User";
import db from "~src/entity/Firebase";

export default class UserRepository {
  constructor() {
    this.db = db;
  }

  async createOne(fields) {
    return await this.db.collection(User.COLLECTION).add(fields);
  }

  async readAll() {
    return await this.db.collection(User.COLLECTION).get();
  }

  async readOneById(id) {
    return await this.db.collection(User.COLLECTION).doc(id).get();
  }
}
