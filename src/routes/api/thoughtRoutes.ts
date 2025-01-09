import { Router } from "express";
const router = Router();
import {
  createThought,
  getAllThoughts,
} from "../../controllers/thought-controller.js";

// /api/users
router.route("/").post(createThought).get(getAllThoughts);

// /api/users/:userId
// router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

export default router;
