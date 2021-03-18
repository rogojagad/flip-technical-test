import HTTPClient from "@src/entity/HTTPClient";

export default class DisbursementHttpRepository {
  constructor() {
    this.client = new HTTPClient();
    this.actionEndpoint = process.env.FLIP_API_DISBURSEMENT_ACTION;
  }

  async sendDisbursement(data) {}

  async checkDisbursementStatus(transactionId) {
    const response = this.client.get(`${this.actionEndpoint}/${transactionId}`);
    console.log(response);
  }
}

new DisbursementHttpRepository().checkDisbursementStatus("3246628793");
