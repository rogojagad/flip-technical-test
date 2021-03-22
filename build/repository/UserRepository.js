"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../const/User"));

var _Firebase = _interopRequireDefault(require("../entity/Firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserRepository {
  constructor() {
    this.db = _Firebase.default;
  }

  async createOne(fields) {
    const docRef = await (await this.db.collection(_User.default.COLLECTION).add(fields)).get();
    const id = docRef.id;
    const data = docRef.data();
    return {
      id,
      ...data
    };
  }

  async readAll() {
    return await this.db.collection(_User.default.COLLECTION).get();
  }

  async readOneById(idParam) {
    const docRef = await this.db.collection(_User.default.COLLECTION).doc(idParam).get();
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

}

exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map