import CreateDisbursementService from "~src/service/CreateDisbursementService";
import DisbursementQueryParam from "~src/const/DisbursementQueryParam";
import ReadDisbursementService from "~src/service/ReadDisbursementService";
import ResponseFactory from "~src/factory/ResponseFactory";

export default class DisbursementController {
  constructor() {
    this.createDisbursementService = new CreateDisbursementService();
    this.readDisbursementService = new ReadDisbursementService();
    this.responseFactory = new ResponseFactory();
  }

  async createOne(requestBody, res) {
    const userId = requestBody[DisbursementQueryParam.USER_ID];
    const remark = requestBody[DisbursementQueryParam.REMARK];

    if (userId) {
      const disbursement = await this.createDisbursementService.createOneByUserId(
        userId,
        remark
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
