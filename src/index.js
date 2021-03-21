import "dotenv/config";
import AuthController from "~src/controller/AuthController";
import bodyParser from "body-parser";
import DisbursementController from "~src/controller/DisbursementController";
import express from "express";
import ResponseFactory from "~src/factory/ResponseFactory";
import session from "express-session";
import UserController from "~src/controller/UserController";
import { v4 as uuid } from "uuid";

const app = express();
const disbursementController = new DisbursementController();
const port = process.env.PORT || 5000;
const responseFactory = new ResponseFactory();
const userController = new UserController();
const authController = new AuthController();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    genid: (req) => {
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
app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  return userController.readOneByUserId(userId, res);
});
app.get("/user/:userId/disbursement", (req, res) => {
  const userId = req.params.userId;
  return disbursementController.readManyByUserId(userId, res);
});
app.post("/user/disbursement", (req, res) => {
  return disbursementController.createOne(req.body, res);
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
