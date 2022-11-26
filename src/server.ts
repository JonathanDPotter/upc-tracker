import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
// config
import config from "./config";
// routes
import indexRoutes from "./routes";
import groupRoutes from "./routes/group";
import userRoutes from "./routes/user";

const server = express();

server.listen(config.SERVER.port, () => {
  console.log(`Server listening on port: ${config.SERVER.port}`);

  // connect to mongoose
  mongoose.connect(config.MONGO.url, config.MONGO.options, () =>
    console.log(`Connected to mongodb collection ${config.MONGO.collection}`)
  );

  // add logging with morgan
  server.use(morgan("dev"));

  // parsing requests
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // cors setup
  server.use(
    cors({
      origin: "*",
      allowedHeaders: "*"
    })
  );

  // add helmet
  server.use(helmet());

  // routes
  server.use("/", indexRoutes);
  server.use("/api/group", groupRoutes);
  server.use("/api/user", userRoutes);
});
