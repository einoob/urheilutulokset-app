import express from "express";
import pageRouter from './routes/twotwenty.js'
import { DEV_PORT } from "../.constants.js";

const app = express();

const PORT = DEV_PORT;

app.get("/", (_req, res) => {
  res.send("Hello world");
});

app.use(pageRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
