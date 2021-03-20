import ReadDisbursementService from "~src/service/ReadDisbursementService";
import ResponseFactory from "~src/factory/ResponseFactory";

export default class DisbursementController {
  constructor() {
    this.readDisbursementService = new ReadDisbursementService();
    this.responseFactory = new ResponseFactory();
  }

  async readManyByUserId(userId, res) {
    const disbursements = this.readDisbursementService.readManyByUserId(userId);

    return this.responseFactory.responseOk(res, disbursements);
  }
}
