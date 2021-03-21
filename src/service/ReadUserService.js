import UserRepository from "~src/repository/UserRepository";

export default class ReadUserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async readOneById(idParam) {
    return await this.userRepository.readOneById(idParam);
  }

  async readAll() {
    const users = await this.userRepository.readAll();
    const results = new Array();

    users.forEach((user) => {
      const id = user.id;
      results.push({ id, ...user.data() });
    });

    return results;
  }
}
