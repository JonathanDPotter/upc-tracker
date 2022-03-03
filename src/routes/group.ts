import { Router } from "express";
import controller from "../controllers/group";
import extractJWT from "../middleware/extractJWT";

const router = Router();

router.post("/", controller.makeGroup);

router.get("/", controller.getGroups);

router.get("/:_id", controller.getGroup);

router.put("/:_id", controller.updateGroup);

router.delete("/:_id", extractJWT, controller.deleteGroup);

export default router;
