import dotenv from "dotenv";

dotenv.config();

const { PORT, MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_COLLECTION } =
  process.env;

const server = { port: PORT };

const mongo = {
  user: MONGO_USER,
  pasword: MONGO_PASSWORD,
  host: MONGO_HOST,
  collection: MONGO_COLLECTION,
  url: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_COLLECTION}`,
  options: { retryWrites: true },
};

const config = { server, mongo };

export default config;
