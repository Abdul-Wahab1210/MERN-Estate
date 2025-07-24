import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email.trim().length === 0) {
    return next(errorHandler(400, "Email is required and cannot be empty."));
  }
  if (!password || password.trim().length < 6) {
    return next(errorHandler(400, "Password must have at least 6 characters."));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: _, ...userWithoutPassword } = user._doc;
    res
      .cookie("accesstoken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        userWithoutPassword,
      });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: _, ...userWithoutPassword } = user._doc;
      res
        .cookie("accesstoken", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          userWithoutPassword,
        });
    } else {
      const generatedpassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedpassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-5),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: _, ...userWithoutPassword } = newUser._doc;
      res
        .cookie("accesstoken", token, {
          httpOnly: true,
        })
        .status(201)
        .json({
          userWithoutPassword,
        });
    }
  } catch (error) {
    next(error);
  }
};
