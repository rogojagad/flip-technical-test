"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Balance = _interopRequireDefault(require("../const/Balance"));

var _Firebase = _interopRequireDefault(require("../entity/Firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BalanceRepository {
  constructor() {
    this.db = _Firebase.default;
  }

  async readOneByUserId(userId) {
    const docRef = (await this.db.collection(_Balance.default.COLLECTION).where(_Balance.default.ATTRIBUTE_USER_ID, "==", userId).get()).docs[0];
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

  async createOne(fields) {
    const docRef = await (await this.db.collection(_Balance.default.COLLECTION).add(fields)).get();
    const id = docRef.id;
    const data = docRef.data();
    return {
      id,
      ...data
    };
  }

  async updateOne(id, fields) {
    return await this.db.collection(_Balance.default.COLLECTION).doc(id).update(fields);
  }

}

exports.default = BalanceRepository;
//# sourceMappingURL=BalanceRepository.js.map