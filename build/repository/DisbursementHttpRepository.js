"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DisbursementResponse = _interopRequireDefault(require("../const/DisbursementResponse"));

var _HTTPClient = _interopRequireDefault(require("../entity/HTTPClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DisbursementHttpRepository {
  constructor() {
    this.client = new _HTTPClient.default();
    this.actionEndpoint = process.env.FLIP_API_DISBURSEMENT_ACTION;
  }

  async sendDisbursement(data) {
    const response = Object();

    try {
      const apiResponse = await this.client.post(this.actionEndpoint, data);
      response[_DisbursementResponse.default.ATTRIBUTE_DATA] = apiResponse.data;
      response[_DisbursementResponse.default.ATTRIBUTE_RESPONSE_STATUS] = apiResponse.status;
      response[_DisbursementResponse.default.ATTRIBUTE_RESPONSE_STATUS_TEXT] = apiResponse.statusText;
      return response;
    } catch (error) {
      response[_DisbursementResponse.default.ATTRIBUTE_DATA] = error.response.data;
      response[_DisbursementResponse.default.ATTRIBUTE_RESPONSE_STATUS] = error.response.status;
      response[_DisbursementResponse.default.ATTRIBUTE_RESPONSE_STATUS_TEXT] = error.response.statusText;
    }

    return response;
  }

  async getDisbursementStatus(transactionId) {
    const response = Object();

    try {
      const apiResponse = await this.client.get(`${this.actionEndpoint}/${transactionId}`);
      response[_DisbursementResponse.default.ATTRIBUTE_DATA] = apiResponse.data;
      response[_DisbursementResponse.default.ATTRIBUTE_RESPONSE_STATUS] = apiResponse.status;
      response[_DisbursementResponse.default.ATTRIBUTE_RESPONSE_STATUS_TEXT] = apiResponse.statusText;
      return response;
    } catch (error) {
      response[_DisbursementResponse.default.ATTRIBUTE_DATA] = error.response.data;
      response[_DisbursementResponse.default.ATTRIBUTE_RESPONSE_STATUS] = error.response.status;
      response[_DisbursementResponse.default.ATTRIBUTE_RESPONSE_STATUS_TEXT] = error.response.statusText;
    }

    return response;
  }

}

exports.default = DisbursementHttpRepository;
//# sourceMappingURL=DisbursementHttpRepository.js.map