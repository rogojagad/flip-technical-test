import Auth from "~src/const/Auth";
import ResponseFactory from "~src/factory/ResponseFactory";

export async function isAuthenticated(req, res, next) {
  const responseFactory = new ResponseFactory();

  const sessionUserId = req.session[Auth.SESSION_KEY_USER_ID];
  const sessionUserName = req.session[Auth.SESSION_KEY_USER_NAME];
  const isAuthenticated = sessionUserId && sessionUserName;

  if (isAuthenticated) {
    return next();
  }

  return responseFactory.responseUnauthorized(res, {
    message: "Please do login first",
  });
}
