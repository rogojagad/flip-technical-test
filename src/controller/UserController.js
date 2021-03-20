import ReadBalanceService from "~src/service/ReadBalanceService";
import ReadUserService from "~src/service/ReadUserService";
import ResponseFactory from "~src/factory/ResponseFactory";

export default class UserController {
  constructor() {
    this.readBalanceService = new ReadBalanceService();
    this.readUserService = new ReadUserService();
    this.responseFactory = new ResponseFactory();
  }

  async readAll(res) {
    const users = await this.readUserService.readAll();
    return this.responseFactory.responseOk(res, users);
  }

  async readOneByUserId(userId, res) {
    let user = await this.readUserService.readOneById(userId);
    let balance = await this.readBalanceService.readOneByUserId(userId);

    if (user && balance) {
      const { id, amount } = balance;
      user = { balance: { id, amount }, ...user };
      return this.responseFactory.responseOk(res, user);
    }

    return this.responseFactory.responseNotFound(res, { message: "Not Found" });
  }
}
