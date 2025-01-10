import { Request, Response } from "express";
import Thought from "../models/Thought.js";

export const createReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId } = req.params;
    const reaction = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: reaction } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    return res.status(200).json(updatedThought);
  } catch (error) {
    return res.status(500).json({ message: "Error creating reaction", error });
  }
};

export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId } = req.params;
    const { reactionId } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    return res.status(200).json(updatedThought);
  } catch (error) {
    return res.status(500).json({ message: "Error deleting reaction", error });
  }
};
