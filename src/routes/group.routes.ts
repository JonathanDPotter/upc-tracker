import { Router } from "express";
import controller from "../controllers/group";
import extractJWT from "../middleware/extractJWT";

const router = Router();

router.post("/", extractJWT, controller.createGroupHandler);
router.get("/", controller.getAllGroupsHandler);
router.get("/:_id", controller.getGroupHandler);
router.get("/user/:_id", controller.getUserGroupsHandler);
router.put("/:_id", extractJWT, controller.updateGroupHandler);
router.delete("/:_id", extractJWT, controller.deleteGroupHandler);

export default router;
