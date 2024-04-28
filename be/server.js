import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import connect from "./database/database.js";
import checkToken from "./authentication/auth.js";
import {
  usersRouter,
  categoriesRouter,
  budgetRouter,
  transactionRouter,
} from "./routes/index.js";

dotenv.config();

const app = express();

const port = process.env.PORT ?? 3000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(cors());

app.use(checkToken);

app.use("/media/categories", express.static("media/categories/income"));
app.use("/media/categories", express.static("media/categories/expense"));

// routers
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/budget", budgetRouter);
app.use("/api/v1/transaction", transactionRouter);

app.listen(port, async () => {
  debugger;
  await connect();
  console.log(`Server is running on port: ${port}`);
});
