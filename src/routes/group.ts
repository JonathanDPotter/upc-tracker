import { Router } from "express";
import controller from "../controllers/group";

const router = Router();

router.post("/", controller.makeGroup);

export default router;
