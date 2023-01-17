import { object, string, boolean, TypeOf, number, array } from "zod";

export const createGroupSchema = object({
  body: object({
    userId: string({
      required_error: "User record is required",
    }),
    title: string({
      required_error: "Title is required",
    }).max(30, "Title too long - must be fewer than 30 characters."),
    upcs: array(
      number({
        required_error: "Upcs are required.",
      })
    ),
  }),
});

export type CreateGroupInput = TypeOf<typeof createGroupSchema>;
