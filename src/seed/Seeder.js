import { deleteQueryBatch } from "~src/seed/Truncator";
import User from "~src/const/User";
import Balance from "~src/const/Balance";
import BalanceRepository from "~src/repository/BalanceRepository";
import db from "~src/entity/Firebase";
import Disbursement from "~src/const/Disbursement";
import UserRepository from "~src/repository/UserRepository";

const userRepository = new UserRepository();
const balanceRepository = new BalanceRepository();
const allCollections = [
  User.COLLECTION,
  Balance.COLLECTION,
  Disbursement.COLLECTION,
];

seed();

async function truncateCollection() {
  const batchSize = 5;

  allCollections.forEach((collection) => {
    const collectionRef = db.collection(collection);
    const query = collectionRef.orderBy("__name__").limit(batchSize);

    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
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

  for (let index = 0; index < 5; index++) {
    const fields = Object();
    fields[User.ATTRIBUTE_NAME] = `User ${index}`;
    fields[User.ATTRIBUTE_BANK_CODE] = `BCA`;
    fields[User.ATTRIBUTE_ACCOUNT_NUMBER] = `12300${index}`;

    const user = await userRepository.createOne(fields);
    userIds.push(user.id);
  }

  return userIds;
}

async function seedBalance(userIds) {
  userIds.forEach((userId) => {
    const fields = Object();
    fields[Balance.ATTRIBUTE_AMOUNT] = 1000000;
    fields[Balance.ATTRIBUTE_USER_ID] = userId;

    balanceRepository.createOne(fields);
  });
}
