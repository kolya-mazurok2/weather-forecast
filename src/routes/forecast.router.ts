import express from "express";
import { get } from "../controllers/forecast.controller";
import { auth } from "../middlewares/auth.middleware";

const forecastRouter = express.Router();

forecastRouter.get("", auth, get);

export default forecastRouter;
