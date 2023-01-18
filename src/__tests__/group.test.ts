import * as GroupService from "../services/group.service";
import supertest from "supertest";
import createServer from "../utils/createServer";
import signJWT from "../utils/signJWT";

const app = createServer();

const userInput = {
  username: "demo",
  password: "password",
};

const groupInput = {
  userId: "63432532c2162b0292491087",
  title: "title",
  upcs: [12345678910],
};

const groupPayload = {
  userId: "63432532c2162b0292491087",
  title: "title",
  upcs: [12345678910],
  _id: "63adaad517bbb1c2dc885c37",
  createdAt: "2022-12-29T14:57:25.786Z",
  updatedAt: "2022-12-29T14:57:25.786Z",
  __v: 0,
};

describe("group", () => {
  describe("group creation", () => {
    describe("given the inputs are valid", () => {
      it("should return the group payload", async () => {
        const createGroupServiceMock = jest
          .spyOn(GroupService, "createGroup")
          // @ts-ignore
          .mockReturnValueOnce(groupPayload);

        const jwt = await signJWT(userInput);

        const { statusCode, body } = await supertest(app)
          .post("/api/group")
          .set({ Authorization: `Bearer ${jwt}` })
          .send(groupInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(groupPayload);
        expect(createGroupServiceMock).toHaveBeenCalledWith(groupInput);
      });
    });

    describe("given the group service throws", () => {
      it("should return a 409 error ", async () => {
        const createGroupServiceMock = jest
          .spyOn(GroupService, "createGroup")
          .mockRejectedValueOnce("oh no :(");

        const jwt = await signJWT(userInput);

        const { statusCode } = await supertest(app)
          .post("/api/group")
          .set({ Authorization: `Bearer ${jwt}` })
          .send({
            userId: null,
            title: null,
            body: "body",
            published: true,
          });

        expect(statusCode).toBe(500);
        expect(createGroupServiceMock).toHaveBeenCalled();
      });
    });
  });
});
