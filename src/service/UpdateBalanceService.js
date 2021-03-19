import BalanceRepository from "~src/repository/BalanceRepository";

export default class ReadUserService {
  constructor() {
    this.balanceRepository = new BalanceRepository();
  }

  async updateOne(id, fields) {
    return await this.balanceRepository.updateOne(id, fields);
  }
}
