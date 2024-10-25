import { Router } from "express";
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
  createReply,
  findReply,
  updateReply,
  deleteReply,
} from "../controllers/commentController";

const router = Router();

router.post("/", createComment);
router.get("/", getAllComments);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
router.post("/replies/", createReply);
router.get("/replies/:id", findReply);
router.put("/replies/:id", updateReply);
router.delete("/replies/:id", deleteReply);

export default router;
