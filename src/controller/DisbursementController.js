import CreateDisbursementService from "~src/service/CreateDisbursementService";
import Disbursement from "~src/const/Disbursement";
import ReadDisbursementService from "~src/service/ReadDisbursementService";
import ResponseFactory from "~src/factory/ResponseFactory";

export default class DisbursementController {
  constructor() {
    this.createDisbursementService = new CreateDisbursementService();
    this.readDisbursementService = new ReadDisbursementService();
    this.responseFactory = new ResponseFactory();
  }

  async createOneByUserId(requestBody, res) {
    const userId = requestBody[Disbursement.REQUEST_QUERY_USER_ID];

    if (userId) {
      const disbursement = await this.createDisbursementService.createOneByUserId(
        userId
      );

      return this.responseFactory.responseCreated(res, disbursement);
    }

    return this.responseFactory.responseBadRequest(res);
  }

  async readManyByUserId(userId, res) {
    const disbursements = await this.readDisbursementService.readManyByUserId(
      userId
    );

    return this.responseFactory.responseOk(res, disbursements);
  }
}
