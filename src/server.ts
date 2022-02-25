import express from "express";
import mongoose from "mongoose";
import config from "./config";
// routes
import indexRoutes from "./routes";
import groupRoutes from "./routes/group";
import userRoutes from "./routes/user";

const server = express();

server.listen(config.SERVER.port, () => {
  console.log(`Server listening on port: ${config.SERVER.port}`);
  mongoose.connect(config.MONGO.url, config.MONGO.options, () =>
    console.log(`Connected to mongodb collection ${config.MONGO.collection}`)
  );

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use("/", indexRoutes);
  server.use("/api/group", groupRoutes);
  server.use("/api/user", userRoutes);
});
