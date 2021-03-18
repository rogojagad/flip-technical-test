import UserRepository from "~src/repository/UserRepository";

export default class ReadUserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async readOneById(id) {
    return await this.userRepository.readOneById(id);
  }

  async readAll() {
    const users = await this.userRepository.readAll();
    const results = new Array();

    users.forEach((user) => {
      results.push(user.data());
    });

    return results;
  }
}
