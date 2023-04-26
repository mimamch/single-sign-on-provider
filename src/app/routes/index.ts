import { Router } from "express";
import AuthRouter from "./auth_route";

const MainRouter = Router();

MainRouter.use("/auth", AuthRouter);

export default MainRouter;
