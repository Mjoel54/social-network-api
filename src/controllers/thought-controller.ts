import { Request, Response } from "express";
import Thought from "../models/Thought.js";
import User from "../models/User.js"; // Assuming there's a User model to handle user data

// GET all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch thoughts", details: err });
  }
};

// GET a single thought by its _id
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }
    return res.status(200).json(thought);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to fetch thought", details: err });
  }
};

// POST to create a new thought
export const createThought = async (req: Request, res: Response) => {
  const { thoughtText, username, userId } = req.body;
  try {
    const newThought = await Thought.create({ thoughtText, username });
    // Push the thought's _id to the user's thoughts array
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(201).json(newThought);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to create thought", details: err });
  }
};

// PUT to update a thought by its _id
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    return res.status(200).json(updatedThought);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to update thought", details: err });
  }
};

// DELETE to remove a thought by its _id
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    // Remove the thought's _id from the associated user's thoughts array
    await User.updateMany(
      { thoughts: thought._id },
      { $pull: { thoughts: thought._id } }
    );

    return res.status(200).json({ message: "Thought deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to delete thought", details: err });
  }
};
