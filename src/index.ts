import express, { Application } from "express";
import morgan from "morgan";
import { dataSource } from "./config/database";
import router from "./routes";
import jobs from "./jobs";
import apiErrorMiddleware from "./middlewares/api-error.middleware";
import bcrypt from "bcrypt";
import { syncCurrentForecasts } from "./services/task/forecast.task";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(express.static("public"));
app.use(morgan("tiny"));

app.use(router);

app.use(apiErrorMiddleware);

(async () => {
  try {
    await dataSource.initialize();

    if (process.env.ENV === "prod") {
      jobs();
    }

    app.listen(PORT, () => {
      console.log(`Server is running at URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Database connection can not be established. Reason: ${error}`);
    process.exit(1);
  }
})();
