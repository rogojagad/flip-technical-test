import "dotenv/config";
import AuthController from "~src/controller/AuthController";
import bodyParser from "body-parser";
import DisbursementController from "~src/controller/DisbursementController";
import DisbursementResponseController from "~src/controller/DisbursementResponseController";
import express from "express";
import ResponseFactory from "~src/factory/ResponseFactory";
import session from "express-session";
import UserController from "~src/controller/UserController";
import { v4 as uuid } from "uuid";
import { isAuthenticated } from "~src/middleware/IsAuthenticated";

const app = express();
const disbursementController = new DisbursementController();
const port = process.env.PORT || 5000;
const responseFactory = new ResponseFactory();
const userController = new UserController();
const authController = new AuthController();
const disbursementResponseController = new DisbursementResponseController();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    genid: (_) => {
      return uuid();
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
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
app.get("/user/:userId", isAuthenticated, (req, res) => {
  const userId = req.params.userId;
  return userController.readOneByUserId(userId, res);
});
app.get("/user/:userId/disbursement", isAuthenticated, (req, res) => {
  const userId = req.params.userId;
  return disbursementController.readManyByUserId(userId, res);
});
app.get("/disbursements", isAuthenticated, (_, res) => {
  return disbursementResponseController.readAll(res);
});
app.post("/user/disbursement", isAuthenticated, (req, res) => {
  return disbursementController.createOne(req.body, req, res);
});
app.get("*", function (_, res) {
  responseFactory.responseNotFound(res);
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }

  console.log(`Serving on port ${port}`);
});
