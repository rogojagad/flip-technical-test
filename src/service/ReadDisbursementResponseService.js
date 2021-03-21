import DisbursementResponseRepository from "~src/repository/DisbursementResponseRepository";

export default class ReadDisbursementResponseService {
  constructor() {
    this.disbursementResponseRepository = new DisbursementResponseRepository();
  }

  async readAll() {
    const responses = await this.disbursementResponseRepository.readAll();
    const results = new Array();

    responses.forEach((response) => {
      const id = response.id;
      results.push({ id, ...response.data() });
    });

    return results;
  }
}
