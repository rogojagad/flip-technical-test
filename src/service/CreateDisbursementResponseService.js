import DisbursementResponseRepository from "~src/repository/DisbursementResponseRepository";

export default class CreateDisbursementResponseService {
  constructor() {
    this.disbursementResponseRepository = new DisbursementResponseRepository();
  }

  async createOne(fields) {
    return await this.disbursementResponseRepository.createOne(fields);
  }
}
