import BalanceRepository from "~src/repository/BalanceRepository";

export default class ReadUserService {
  constructor() {
    this.balanceRepository = new BalanceRepository();
  }

  async readOneByUserId(userId) {
    return await this.balanceRepository.readOneByUserId(userId);
  }
}
