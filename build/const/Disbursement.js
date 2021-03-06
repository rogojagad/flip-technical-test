"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseConst = _interopRequireDefault(require("./BaseConst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const COLLECTION = "disbursement";
const ATTRIBUTE_ACCOUNT_NUMBER = "account_number";
const ATTRIBUTE_AMOUNT = "amount";
const ATTRIBUTE_BANK_CODE = "bank_code";
const ATTRIBUTE_RECEIPT_URL = "receipt_url";
const ATTRIBUTE_REMARK = "remark";
const ATTRIBUTE_STATUS = "status";
const ATTRIBUTE_TIME_SERVED = "time_served";
const ATTRIBUTE_TRANSACTION_ID = "transaction_id";
const ATTRIBUTE_USER_ID = "user_id";
const STATUS_DRAFT = "DRAFT";
const STATUS_PENDING = "PENDING";
const STATUS_SUCCESS = "SUCCESS";

var _default = Object.freeze({ ..._BaseConst.default,
  ATTRIBUTE_ACCOUNT_NUMBER,
  ATTRIBUTE_AMOUNT,
  ATTRIBUTE_BANK_CODE,
  ATTRIBUTE_RECEIPT_URL,
  ATTRIBUTE_REMARK,
  ATTRIBUTE_STATUS,
  ATTRIBUTE_TIME_SERVED,
  ATTRIBUTE_TRANSACTION_ID,
  ATTRIBUTE_USER_ID,
  COLLECTION,
  STATUS_DRAFT,
  STATUS_PENDING,
  STATUS_SUCCESS
});

exports.default = _default;
//# sourceMappingURL=Disbursement.js.map