import * as express from "express";
import { userRouter } from "./routes/user-router";
import * as bodyParser from "body-parser";
import * as database from "./core/database";

class App {
  public express;

  constructor() {
    this.express = express();
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json()); // parse application/json
    database.connection();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();

    this.express.use("/", router);
    this.express.use("/users", userRouter);
  }
}

export default new App().express;
