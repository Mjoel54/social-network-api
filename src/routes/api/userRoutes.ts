import { Router } from "express";
const router = Router();
import {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from "../../controllers/user-controller.js";

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

export default router;
