import BalanceRepository from "~src/repository/BalanceRepository";

export default class ReadBalanceService {
  constructor() {
    this.balanceRepository = new BalanceRepository();
  }

  async readOneByUserId(userId) {
    const docRef = await this.balanceRepository.readOneByUserId(userId);

    const id = docRef.id;
    const data = docRef.data();

    return { id, ...data };
  }
}
