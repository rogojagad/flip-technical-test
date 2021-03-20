import DisbursementRepository from "~src/repository/DisbursementRepository";

export default class ReadDisbursementService {
  constructor() {
    this.disbursementRepository = new DisbursementRepository();
  }

  async readOneByTransactionId(transactionId) {
    transactionId = parseInt(transactionId);
    return await this.disbursementRepository.readOneByTransactionId(
      transactionId
    );
  }

  async readManyByUserId(userId) {
    return await this.disbursementRepository.readManyByUserId(userId);
  }

  async readManyByStatus(status) {
    return await this.disbursementRepository.readManyByStatus(status);
  }
}
