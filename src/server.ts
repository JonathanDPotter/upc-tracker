import express from "express";
import mongoose from "mongoose";
import config from "./config";
// routes
import indexRoutes from "./routes";

const server = express();

server.listen(config.server.port, () => {
  console.log(`Server listening on port: ${config.server.port}`);
  mongoose.connect(config.mongo.url, config.mongo.options, () =>
    console.log(`Connected to mongodb collection ${config.mongo.collection}`)
  );
  server.use("/", indexRoutes);
});
