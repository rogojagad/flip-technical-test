"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Disbursement = _interopRequireDefault(require("../const/Disbursement"));

var _Firebase = _interopRequireDefault(require("../entity/Firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DisbursementRepository {
  constructor() {
    this.db = _Firebase.default;
  }

  async createOne(fields) {
    const docRef = await (await this.db.collection(_Disbursement.default.COLLECTION).add(fields)).get();
    const id = docRef.id;
    const data = docRef.data();
    return {
      id,
      ...data
    };
  }

  async updateOne(id, fields) {
    return await this.db.collection(_Disbursement.default.COLLECTION).doc(id).update(fields);
  }

  async readOneByTransactionId(transactionId) {
    const docRef = (await this.db.collection(_Disbursement.default.COLLECTION).where(_Disbursement.default.ATTRIBUTE_TRANSACTION_ID, "==", transactionId).get()).docs[0];
    const id = docRef.id;
    const data = docRef.data();

    if (data) {
      return {
        id,
        ...data
      };
    }

    return null;
  }

  async readManyByUserId(userId) {
    const disbursementsRef = (await this.db.collection(_Disbursement.default.COLLECTION).where(_Disbursement.default.ATTRIBUTE_USER_ID, "==", userId).get()).docs;
    const disbursements = new Array();
    disbursementsRef.forEach(disbursementRef => {
      const id = disbursementRef.id;
      const data = disbursementRef.data();
      disbursements.push({
        id,
        ...data
      });
    });
    return disbursements;
  }

  async readManyByStatus(status) {
    const disbursementsRef = (await this.db.collection(_Disbursement.default.COLLECTION).where(_Disbursement.default.ATTRIBUTE_STATUS, "==", status).get()).docs;
    const disbursements = new Array();
    disbursementsRef.forEach(disbursementRef => {
      const id = disbursementRef.id;
      const data = disbursementRef.data();
      disbursements.push({
        id,
        ...data
      });
    });
    return disbursements;
  }

}

exports.default = DisbursementRepository;
//# sourceMappingURL=DisbursementRepository.js.map