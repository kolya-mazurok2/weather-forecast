import { Router } from "express";

const router = Router();

router.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

export default router;
