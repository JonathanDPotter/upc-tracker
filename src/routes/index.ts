import { Request, Response, Router } from "express";

const router = Router();

router.get("", (req: Request, res: Response) =>
  res.json({ message: "Welcome to the UPC tracker API." })
);

export default router;
