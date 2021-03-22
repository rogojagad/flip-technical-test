"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _axios = _interopRequireDefault(require("axios"));

var _DisbursementPayload = _interopRequireDefault(require("../const/DisbursementPayload"));

var _querystring = _interopRequireDefault(require("querystring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HTTPClient {
  constructor() {
    const apiSecret = process.env.FLIP_API_SECRET_KEY;
    const basicToken = "Basic " + Buffer.from(`${apiSecret}:`).toString("base64");
    const header = Object();
    header[_DisbursementPayload.default.FIELD_HEADER_AUTHORIZATION] = basicToken;
    header[_DisbursementPayload.default.FIELD_HEADER_CONTENT_TYPE] = "application/x-www-form-urlencoded";
    const options = {
      baseURL: process.env.FLIP_API_BASE_URL,
      headers: header
    };
    this.client = _axios.default.create(options);
  }

  async get(endpoint) {
    return await this.client.get(endpoint);
  }

  async post(endpoint, data) {
    return await this.client.post(endpoint, _querystring.default.stringify(data));
  }

}

exports.default = HTTPClient;
//# sourceMappingURL=HTTPClient.js.map