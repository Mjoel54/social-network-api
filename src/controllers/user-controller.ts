import { User } from "../models/index.js";
import { Request, Response } from "express";
import mongoose from "mongoose";

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single user
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select("-__v");

    if (!user) {
      return res.status(404).json({ message: "No user with that ID" });
    }

    res.json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// // create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a user by their ID
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params; // Extract the user ID from the request parameters
    const updateData = req.body; // Extract fields to be updated from the request body

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).send("Invalid user ID format");
      return; // Ensure no further code executes
    }

    // Perform the update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData }, // Only update the provided fields
      { new: true, runValidators: true } // Return the updated document and validate input
    );

    // Handle case where user is not found
    if (!updatedUser) {
      res.status(404).send("User not found");
      return; // Ensure no further code executes
    }

    res.status(200).json(updatedUser); // Send the updated user as a response
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

// Delete a user by their ID

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const results = await User.deleteOne({ _id: req.params.userId });
    console.log(results);
  } catch (error) {
    res.status(500).json({ error });
  }
};
