import { Router } from "express";
import cityRouter from "./city.router";

const router = Router();

router.use("/cities", cityRouter);

export default router;
