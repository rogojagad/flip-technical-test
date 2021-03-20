import bodyParser from "body-parser";
import express from "express";
import UserController from "~src/controller/UserController";

const app = express();
const port = process.env.PORT || 5000;
const userController = new UserController();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable("etag");

app.get("/", (req, res) => {
  res.send("Alive", 200);
});
app.get("/users", (req, res) => {
  return userController.readAll(res);
});
app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  return userController.readOneByUserId(userId, res);
});
app.get("*", function (req, res) {
  res.send("not found", 404);
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
});
