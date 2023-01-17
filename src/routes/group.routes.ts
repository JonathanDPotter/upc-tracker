import { Router } from "express";
import controller from "../controllers/group";
import extractJWT from "../middleware/extractJWT";

const router = Router();

router.post("/", extractJWT, controller.creategroupHandler);
router.get("/", controller.getAllgroupsHandler);
router.get("/:_id", controller.getgroupHandler);
router.put("/:_id", extractJWT, controller.updategroupHandler);
router.delete("/:_id", extractJWT, controller.deletegroupHandler);

export default router;
