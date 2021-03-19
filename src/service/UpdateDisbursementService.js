import DisbursementRepository from "~src/repository/DisbursementRepository";

export default class UpdateDisbursementService {
  constructor() {
    this.disbursementRepository = new DisbursementRepository();
  }

  async updateOne(id, fields) {
    return await this.disbursementRepository.updateOne(id, fields);
  }
}
