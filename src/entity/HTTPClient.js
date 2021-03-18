import "dotenv/config";
import axios from "axios";
import DisbursementPayload from "~src/const/DisbursementPayload";
import querystring from "querystring";

export default class HTTPClient {
  constructor() {
    const apiSecret = process.env.FLIP_API_SECRET_KEY;
    const basicToken =
      "Basic ss" + Buffer.from(`${apiSecret}:`).toString("base64");

    const header = Object();
    header[DisbursementPayload.FIELD_HEADER_AUTHORIZATION] = basicToken;
    header[DisbursementPayload.FIELD_HEADER_CONTENT_TYPE] =
      "application/x-www-form-urlencoded";

    const options = {
      baseURL: process.env.FLIP_API_BASE_URL,
      headers: header,
    };

    this.client = axios.create(options);
  }

  async get(endpoint) {
    return await (await this.client.get(endpoint)).data;
  }

  async post(endpoint, data) {
    return await this.client.post(endpoint, querystring.stringify(data));
  }
}
