import createServer from "./utils/createServer";
import config from "./config";
import mongoConnect from "./utils/mongoConnect";

const server = createServer();

server.listen(config.server.port, async () => {
  console.log(`Server connected on ${config.server.baseURL}`);
  mongoConnect();
});
