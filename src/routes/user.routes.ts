import { Router } from "express";
import controller from "../controllers/user";
import extractJWT from "../middleware/extractJWT";

const router = Router();

router.get("/validate", extractJWT,  controller.validateUserHandler);
router.post("/register", controller.createUserHandler);
router.post("/login", controller.loginHandler);
router.get("/", controller.getAllUsersHandler);
router.get("/:_id", controller.getUserHandler);
router.delete("/:_id", extractJWT, controller.deleteUserHandler);

export default router;
