import HTTPClient from "~src/entity/HTTPClient";

export default class DisbursementHttpRepository {
  constructor() {
    this.client = new HTTPClient();
    this.actionEndpoint = process.env.FLIP_API_DISBURSEMENT_ACTION;
  }

  async sendDisbursement(data) {
    try {
      const response = await this.client.post(this.actionEndpoint, data);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      return {
        data: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };
    }
  }

  async checkDisbursementStatus(transactionId) {
    const response = await this.client.get(
      `${this.actionEndpoint}/${transactionId}`
    );
    return response;
  }
}
