import User from "@src/const/User";
import Balance from "@src/const/Balance";
import BalanceRepository from "@src/repository/BalanceRepository";
import UserRepository from "@src/repository/UserRepository";

const userRepository = new UserRepository();
const balanceRepository = new BalanceRepository();

seed();

async function seed() {
  const userIds = await seedUsers();
  await seedBalance(userIds);
}

async function seedUsers() {
  const userIds = new Array();

  for (let index = 0; index < 5; index++) {
    const userId = `user${index}`;
    const fields = Object();
    fields[User.ATTRIBUTE_ID] = userId;
    fields[User.ATTRIBUTE_NAME] = `User ${index}`;

    userIds.push(userId);
    userRepository.createOne(userId, fields);
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
