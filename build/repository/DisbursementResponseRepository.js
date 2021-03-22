"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DisbursementResponse = _interopRequireDefault(require("../const/DisbursementResponse"));

var _Firebase = _interopRequireDefault(require("../entity/Firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DisbursementRepository {
  constructor() {
    this.db = _Firebase.default;
  }

  async createOne(fields) {
    const docRef = await (await this.db.collection(_DisbursementResponse.default.COLLECTION).add(fields)).get();
    const id = docRef.id;
    const data = docRef.data();
    return {
      id,
      ...data
    };
  }

  async readAll() {
    return await this.db.collection(_DisbursementResponse.default.COLLECTION).get();
  }

}

exports.default = DisbursementRepository;
//# sourceMappingURL=DisbursementResponseRepository.js.map