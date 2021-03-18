import DisbursementResponse from "@src/const/DisbursementResponse";
import HTTPClient from "@src/entity/HTTPClient";

export default class DisbursementHttpRepository {
  constructor() {
    this.client = new HTTPClient();
    this.actionEndpoint = process.env.FLIP_API_DISBURSEMENT_ACTION;
  }

  async sendDisbursement(data) {}

  async checkDisbursementStatus(transactionId) {
    const response = await this.client.get(
      `${this.actionEndpoint}/${transactionId}`
    );
    return response;
  }
}
