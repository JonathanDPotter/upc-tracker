import supertest from "supertest";
import createServer from "../utils/createServer";
import routes from "../routes/routes.json";

const app = createServer();

describe("index routes", () => {
  describe("given a GET request to '/'", () => {
    it("should return the homepage as html", async () => {
      const { statusCode, headers } = await supertest(app).get("/");
      expect(statusCode).toBe(200);
      expect(headers["content-type"]).toMatch(/html/);
    });
  });

  describe("given a GET request to  '/healthcheck'", () => {
    it("should return a status code of 200", async () => {
      const { statusCode } = await supertest(app).get("/healthcheck");
      expect(statusCode).toBe(200);
    });
  });

  describe("given a GET request to '/routes'", () => {
    it("should return the routes.json file", async () => {
      const { statusCode, headers, body } = await supertest(app).get("/routes");
      expect(statusCode).toBe(200);
      expect(headers["content-type"]).toMatch(/json/);
      expect(body).toEqual(routes);
    });
  });

  describe("given that there is no resource at that address", () =>
    it("should redirect to the 404 page and retrn a 404 status", async () => {
      const { statusCode, headers } = await supertest(app).get("/beepboop");
      expect(statusCode).toBe(404);
      expect(headers["content-type"]).toMatch(/html/);
    }));
});
