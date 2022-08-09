import express from "express";
import CityController from "../controllers/city.controller";
import { auth } from "../middlewares/auth.middleware";

const cityRouter = express.Router();

const controller = new CityController();

cityRouter.get("/", auth, controller.getAll);

cityRouter.get("/:id", auth, controller.get);

cityRouter.get("/:id/forecasts/", auth, controller.getForecasts);

export default cityRouter;
