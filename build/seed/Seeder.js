"use strict";

var _Truncator = require("./Truncator");

var _User = _interopRequireDefault(require("../const/User"));

var _Balance = _interopRequireDefault(require("../const/Balance"));

var _BalanceRepository = _interopRequireDefault(require("../repository/BalanceRepository"));

var _Firebase = _interopRequireDefault(require("../entity/Firebase"));

var _Disbursement = _interopRequireDefault(require("../const/Disbursement"));

var _UserRepository = _interopRequireDefault(require("../repository/UserRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRepository = new _UserRepository.default();
const balanceRepository = new _BalanceRepository.default();
const allCollections = [_User.default.COLLECTION, _Balance.default.COLLECTION, _Disbursement.default.COLLECTION];
seed();

async function truncateCollection() {
  const batchSize = 5;
  allCollections.forEach(collection => {
    const collectionRef = _Firebase.default.collection(collection);

    const query = collectionRef.orderBy("__name__").limit(batchSize);
    return new Promise((resolve, reject) => {
      (0, _Truncator.deleteQueryBatch)(_Firebase.default, query, resolve).catch(reject);
    });
  });
}

async function seed() {
  console.log("Truncating Database");
  await truncateCollection();
  const userIds = await seedUsers();
  await seedBalance(userIds);
  console.log("Done Seeding Database");
}

async function seedUsers() {
  const userIds = new Array();
  const fields = Object();
  fields[_User.default.ATTRIBUTE_NAME] = `User ${0}`;
  fields[_User.default.ATTRIBUTE_BANK_CODE] = `BCA`;
  fields[_User.default.ATTRIBUTE_ACCOUNT_NUMBER] = `12300${0}`;
  const user = await userRepository.createOne(fields);
  userIds.push(user.id);
  return userIds;
}

async function seedBalance(userIds) {
  userIds.forEach(userId => {
    const fields = Object();
    fields[_Balance.default.ATTRIBUTE_AMOUNT] = 1000000;
    fields[_Balance.default.ATTRIBUTE_USER_ID] = userId;
    balanceRepository.createOne(fields);
  });
}
//# sourceMappingURL=Seeder.js.map