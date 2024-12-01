import express from "express";
import mongoose from "mongoose";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import next from "next";
dotenv.config({ path: "./config.env" });
const dev = process.env.NODE_ENV != "production";
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

import authRoute from "./Api/routes/auth.js";
import postRoute from "./Api/routes/posts.js";
import userRoute from "./Api/routes/users.js";

import { errorHandler } from "./Api/middlewares/error.js";
import { verifyToken } from "./Api/middlewares/verifyToken.js";

// Define __dirname for ES modules
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.Port || 3000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("db connected successfully"));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", verifyToken, userRoute);

app.use(errorHandler);

nextServer.prepare().then(() => {
  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, (req, res) => {
    console.log(`server is running on port ${port}`);
  });
});
