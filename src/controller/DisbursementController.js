import CreateDisbursementService from "~src/service/CreateDisbursementService";
import ReadDisbursementService from "~src/service/ReadDisbursementService";
import ResponseFactory from "~src/factory/ResponseFactory";

export default class DisbursementController {
  constructor() {
    this.createDisbursementService = new CreateDisbursementService();
    this.readDisbursementService = new ReadDisbursementService();
    this.responseFactory = new ResponseFactory();
  }

  async createOneByUserId(userId, res) {
    await
  }

  async readManyByUserId(userId, res) {
    const disbursements = await this.readDisbursementService.readManyByUserId(userId);

    return this.responseFactory.responseOk(res, disbursements);
  }
}
