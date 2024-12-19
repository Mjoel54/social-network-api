import { Router } from "express";
const router = Router();
import appRoutes from "./appRoutes.js";
import userRoutes from "./userRoutes.js";

router.use("/apps", appRoutes);
router.use("/users", userRoutes);

export default router;
