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
    const docRef = (
      await this.db
        .collection(Disbursement.COLLECTION)
        .where(Disbursement.ATTRIBUTE_TRANSACTION_ID, "==", transactionId)
        .get()
    ).docs[0];

    const id = docRef.id;
    const data = docRef.data();

    return { id, ...data };
  }

  async readManyByUserId(userId) {
    const disbursementsRef = (
      await this.db
        .collection(Disbursement.COLLECTION)
        .where(Disbursement.ATTRIBUTE_USER_ID, "==", userId)
        .get()
    ).docs;

    const disbursements = new Array();

    disbursementsRef.forEach((disbursementRef) => {
      const id = disbursementRef.id;
      const data = disbursementRef.data();

      disbursements.push({ id, ...data });
    });

    return disbursements;
  }

  async readManyByStatus(status) {
    const disbursementsRef = (
      await this.db
        .collection(Disbursement.COLLECTION)
        .where(Disbursement.ATTRIBUTE_STATUS, "==", status)
        .get()
    ).docs;

    const disbursements = new Array();

    disbursementsRef.forEach((disbursementRef) => {
      const id = disbursementRef.id;
      const data = disbursementRef.data();

      disbursements.push({ id, ...data });
    });

    return disbursements;
  }
}
