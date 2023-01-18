import * as UserService from "../services/user.service";
import supertest from "supertest";
import createServer from "../utils/createServer";

const app = createServer();

const userInput = {
  username: "Test User",
  password: "Password123",
};

const userPayload = {
  username: "Test User",
  _id: "63adaad517bbb1c2dc885c37",
  createdAt: "2022-12-29T14:57:25.786Z",
  updatedAt: "2022-12-29T14:57:25.786Z",
  __v: 0,
};

describe("user", () => {
  describe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/user/register")
          .send(userInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(userPayload);
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given the user service throws", () => {
      it("should return a 409 error ", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockRejectedValueOnce("oh no :(");

        const { statusCode } = await supertest(app)
          .post("/api/user/register")
          .send({ username: null, password: null });

        expect(statusCode).toBe(409);
        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });
});
