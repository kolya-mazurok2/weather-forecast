import express from "express";
import { get, getAll, getForecasts } from "../controllers/city.controller";
import { auth } from "../middlewares/auth.middleware";

const cityRouter = express.Router();

cityRouter.get("/", auth, getAll);

cityRouter.get("/:id", auth, get);

cityRouter.get("/:id/forecasts/", auth, getForecasts);

export default cityRouter;
