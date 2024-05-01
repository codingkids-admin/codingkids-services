import express from "express";
import cors from "cors";
import {
  HomeController,
  ListenController,
  PORT,
} from "./controllers/HomeController.mjs";
import { config } from "dotenv";
import { MailController } from "./controllers/MailController.mjs";

const app = express();
config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", HomeController);
app.post("/mail", MailController);
app.listen(PORT, ListenController);
