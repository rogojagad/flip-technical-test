import ReadDisbursementResponseService from "~src/service/ReadDisbursementResponseService";
import ResponseFactory from "~src/factory/ResponseFactory";

export default class DisbursementResponseController {
  constructor() {
    this.readDisbursementResponseService = new ReadDisbursementResponseService();
    this.responseFactory = new ResponseFactory();
  }

  async readAll(res) {
    const responses = await this.readDisbursementResponseService.readAll();

    return this.responseFactory.responseOk(res, responses);
  }
}
