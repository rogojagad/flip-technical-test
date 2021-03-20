import DisbursementRepository from "~src/repository/DisbursementRepository";

export default class ReadDisbursementService {
  constructor() {
    this.disbursementRepository = new DisbursementRepository();
  }

  async readOneByTransactionId(transactionId) {
    transactionId = parseInt(transactionId);
    const docRef = (
      await this.disbursementRepository.readOneByTransactionId(transactionId)
    ).docs[0];

    const id = docRef.id;
    const data = docRef.data();

    return { id, ...data };
  }

  async readManyByUserId(userId) {
    const disbursementsRef = (
      await this.disbursementRepository.readManyByUserId(userId)
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
