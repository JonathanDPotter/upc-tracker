import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Name is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
