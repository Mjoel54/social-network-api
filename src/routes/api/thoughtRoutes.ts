import { Router } from "express";
const router = Router();
import {
  createThought,
  getAllThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
} from "../../controllers/thought-controller.js";

import {
  createReaction,
  deleteReaction,
} from "../../controllers/reaction-controller.js";

// /api/users
router.route("/").post(createThought).get(getAllThoughts);

// /api/users/:userId
// router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

export default router;
