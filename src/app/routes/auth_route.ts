import { Router } from "express";
import AuthController from "../controllers/auth_controller";

const AuthRouter = Router();
AuthRouter.post("/jwt", AuthController.jwt);
AuthRouter.get("/sign-in", AuthController.loginView);

export default AuthRouter;
