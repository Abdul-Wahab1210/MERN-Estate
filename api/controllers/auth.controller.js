import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || username.trim().length === 0) {
    // Use your error handling middleware to return an appropriate error
    return next(errorHandler(400, "Username is required and cannot be empty."));
  }

  // Check if email is missing or empty after trimming
  if (!email || email.trim().length === 0) {
    // Use your error handling middleware
    return next(errorHandler(400, "Email is required and cannot be empty."));
  }

  // Check if password is missing or empty after trimming
  if (!password || password.trim().length < 6) {
    // Use your error handling middleware
    return next(errorHandler(400, "Password must have at least 6 characters."));
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newuser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newuser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};
