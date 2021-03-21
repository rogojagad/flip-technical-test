import Auth from "~src/const/Auth";
import User from "~src/const/User";
import ResponseFactory from "~src/factory/ResponseFactory";
import ReadUserService from "~src/service/ReadUserService";

export default class AuthController {
  constructor() {
    this.readUserService = new ReadUserService();
    this.responseFactory = new ResponseFactory();
  }

  async login(reqBody, req, res) {
    const username = reqBody[Auth.QUERY_USERNAME];
    const password = reqBody[Auth.QUERY_PASSWORD];

    if (username && password) {
      const user = await this.readUserService.readOneById(username);

      if (user) {
        req.session[Auth.SESSION_KEY_USER_ID] = user[User.ATTRIBUTE_ID];
        req.session[Auth.SESSION_KEY_USER_NAME] = user[User.ATTRIBUTE_NAME];

        return this.responseFactory.responseOk(res, user);
      }

      return this.responseFactory.responseNotFound(res, {
        message: `User with ID ${username} not found`,
      });
    }

    return this.responseFactory.responseBadRequest(res, {
      message: "Username or Password not given",
    });
  }
}
