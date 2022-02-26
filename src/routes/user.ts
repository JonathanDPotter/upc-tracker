import { Router } from "express";
import controller from "../controllers/user";
import extractJWT from "../middleware/extractJWT";

const router = Router();

router.get("/validate", extractJWT,  controller.validateToken);

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/", controller.getUsers);

router.get("/:_id", controller.getUser);

router.put("/:_id", extractJWT, controller.updateUser);

router.delete("/:_id", extractJWT, controller.deleteUser);

export default router;
