import User from "~src/const/User";
import db from "~src/entity/Firebase";

export default class UserRepository {
  constructor() {
    this.db = db;
  }

  async createOne(fields) {
    const docRef = await (
      await this.db.collection(User.COLLECTION).add(fields)
    ).get();

    const id = docRef.id;
    const data = docRef.data();

    return { id, ...data };
  }

  async readAll() {
    return await this.db.collection(User.COLLECTION).get();
  }

  async readOneById(idParam) {
    const docRef = await this.db.collection(User.COLLECTION).doc(idParam).get();
    const id = docRef.id;
    const data = docRef.data();

    if (data) {
      return { id, ...data };
    }

    return null;
  }
}
