import express from "express";
import resultsService from "../services/resultsService.js";

const router = express.Router();

router.get("/api/221-233", async (_req, res) => {
  const data = await resultsService.getPages("221-233")
  res.send(data);
});

export default router;
