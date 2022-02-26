import { Request, Response, Router } from "express";
import welcome from "../welcome.json";

const router = Router();

router.get("", (req: Request, res: Response) => res.json(welcome));

export default router;
