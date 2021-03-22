"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseConst = _interopRequireDefault(require("./BaseConst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const COLLECTION = "disbursement_response";
const ATTRIBUTE_ACCOUNT_NUMBER = "account_number";
const ATTRIBUTE_AMOUNT = "amount";
const ATTRIBUTE_BANK_CODE = "bank_code";
const ATTRIBUTE_BENEFICIARY_NAME = "beneficiary_name";
const ATTRIBUTE_DATA = "data";
const ATTRIBUTE_FEE = "fee";
const ATTRIBUTE_ID = "id";
const ATTRIBUTE_RECEIPT = "receipt";
const ATTRIBUTE_REMARK = "remark";
const ATTRIBUTE_RESPONSE_STATUS = "status";
const ATTRIBUTE_RESPONSE_STATUS_TEXT = "status_text";
const ATTRIBUTE_STATUS = "status";
const ATTRIBUTE_TIME_SERVED = "time_served";
const ATTRIBUTE_TIMESTAMP = "timestamp";
const RESPONSE_STATUS_BAD_INTERNAL_SERVER_ERROR = 500;
const RESPONSE_STATUS_BAD_REQUEST = 400;
const RESPONSE_STATUS_BAD_UNAUTHORIZED = 401;
const RESPONSE_STATUS_OK = 200;
const RESPONSE_STATUS_UNPROCESSABLE_ENTITY = 422;

var _default = Object.freeze({ ..._BaseConst.default,
  ATTRIBUTE_ACCOUNT_NUMBER,
  ATTRIBUTE_AMOUNT,
  ATTRIBUTE_BANK_CODE,
  ATTRIBUTE_BENEFICIARY_NAME,
  ATTRIBUTE_DATA,
  ATTRIBUTE_FEE,
  ATTRIBUTE_ID,
  ATTRIBUTE_RECEIPT,
  ATTRIBUTE_REMARK,
  ATTRIBUTE_RESPONSE_STATUS_TEXT,
  ATTRIBUTE_RESPONSE_STATUS,
  ATTRIBUTE_STATUS,
  ATTRIBUTE_TIME_SERVED,
  ATTRIBUTE_TIMESTAMP,
  COLLECTION,
  RESPONSE_STATUS_BAD_INTERNAL_SERVER_ERROR,
  RESPONSE_STATUS_BAD_REQUEST,
  RESPONSE_STATUS_BAD_UNAUTHORIZED,
  RESPONSE_STATUS_OK,
  RESPONSE_STATUS_UNPROCESSABLE_ENTITY
});

exports.default = _default;
//# sourceMappingURL=DisbursementResponse.js.map