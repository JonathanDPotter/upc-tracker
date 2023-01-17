import mongoose from "mongoose";
import config from "../config";

const mongoConnect = async () => {
  const dbUri = config.mongo.url;

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(dbUri);
    console.log("Connected to db");
  } catch (error) {
    console.log("Could not connect to db");
    process.exit(1);
  }
};

export default mongoConnect;
