"use strict";

require("dotenv/config");

var _AuthController = _interopRequireDefault(require("./controller/AuthController"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _DisbursementController = _interopRequireDefault(require("./controller/DisbursementController"));

var _DisbursementResponseController = _interopRequireDefault(require("./controller/DisbursementResponseController"));

var _express = _interopRequireDefault(require("express"));

var _ResponseFactory = _interopRequireDefault(require("./factory/ResponseFactory"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _UserController = _interopRequireDefault(require("./controller/UserController"));

var _uuid = require("uuid");

var _IsAuthenticated = require("./middleware/IsAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const disbursementController = new _DisbursementController.default();
const port = process.env.PORT || 5000;
const responseFactory = new _ResponseFactory.default();
const userController = new _UserController.default();
const authController = new _AuthController.default();
const disbursementResponseController = new _DisbursementResponseController.default();
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use((0, _expressSession.default)({
  genid: _ => {
    return (0, _uuid.v4)();
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.disable("etag");
app.get("/", (_, res) => {
  return responseFactory.responseOk(res);
});
app.get("/users", (_, res) => {
  return userController.readAll(res);
});
app.post("/login", (req, res) => {
  return authController.login(req.body, req, res);
});
app.get("/user/:userId", _IsAuthenticated.isAuthenticated, (req, res) => {
  const userId = req.params.userId;
  return userController.readOneByUserId(userId, res);
});
app.get("/user/:userId/disbursement", _IsAuthenticated.isAuthenticated, (req, res) => {
  const userId = req.params.userId;
  return disbursementController.readManyByUserId(userId, res);
});
app.get("/disbursements", _IsAuthenticated.isAuthenticated, (_, res) => {
  return disbursementResponseController.readAll(res);
});
app.post("/user/disbursement", _IsAuthenticated.isAuthenticated, (req, res) => {
  return disbursementController.createOne(req.body, req, res);
});
app.get("*", function (_, res) {
  responseFactory.responseNotFound(res);
});
app.listen(port, err => {
  if (err) {
    console.error(err);
  }

  console.log(`Serving on port ${port}`);
});
//# sourceMappingURL=index.js.map