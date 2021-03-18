import DisbursementResponse from "~src/const/DisbursementResponse";
import HTTPClient from "~src/entity/HTTPClient";

export default class DisbursementHttpRepository {
  constructor() {
    this.client = new HTTPClient();
    this.actionEndpoint = process.env.FLIP_API_DISBURSEMENT_ACTION;
  }

  async sendDisbursement(data) {
    const response = Object();

    try {
      const apiResponse = await this.client.post(this.actionEndpoint, data);

      response[DisbursementResponse.ATTRIBUTE_DATA] = apiResponse.data;
      response[DisbursementResponse.ATTRIBUTE_RESPONSE_STATUS] =
        apiResponse.status;
      response[DisbursementResponse.ATTRIBUTE_RESPONSE_STATUS_TEXT] =
        apiResponse.statusText;

      return response;
    } catch (error) {
      response[DisbursementResponse.ATTRIBUTE_DATA] = error.response.data;
      response[DisbursementResponse.ATTRIBUTE_RESPONSE_STATUS] =
        error.response.status;
      response[DisbursementResponse.ATTRIBUTE_RESPONSE_STATUS_TEXT] =
        error.response.statusText;
    }
    return response;
  }

  async checkDisbursementStatus(transactionId) {
    const response = await this.client.get(
      `${this.actionEndpoint}/${transactionId}`
    );
    return response;
  }
}
