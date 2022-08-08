import express from "express";
import CityController from "../controllers/city.controller";

const cityRouter = express.Router();

const controller = new CityController();

cityRouter.get("/", controller.getAll);

cityRouter.get("/:id", controller.get);

cityRouter.get("/:id/forecasts/", controller.getForecasts);

export default cityRouter;
