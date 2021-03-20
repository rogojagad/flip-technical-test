import bodyParser from "body-parser";
import DisbursementController from "~src/controller/DisbursementController";
import express from "express";
import ResponseFactory from "~src/factory/ResponseFactory";
import UserController from "~src/controller/UserController";

const app = express();
const disbursementController = new DisbursementController();
const port = process.env.PORT || 5000;
const responseFactory = new ResponseFactory();
const userController = new UserController();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable("etag");

app.get("/", (req, res) => {
  return responseFactory.responseOk(res);
});
app.get("/users", (req, res) => {
  return userController.readAll(res);
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
  return disbursementController.createOneByUserId(req.body, res);
});
app.get("*", function (req, res) {
  responseFactory.responseNotFound(res);
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
});
