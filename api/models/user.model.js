import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes leading/trailing whitespace before validation
      validate: {
        // Add a custom validator
        validator: function (value) {
          // Check if the trimmed value is not an empty string
          // value.length > 0 is equivalent after trim: true
          return value.length > 0;
        },
        message: "Username cannot be empty.", // Custom error message
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes leading/trailing whitespace
      validate: {
        // Add a custom validator
        validator: function (value) {
          return value.length > 0;
        },
        message: "Email cannot be empty.",
      },
    },
    password: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing whitespace (less common for passwords, but good practice)
      validate: {
        // Add a custom validator
        validator: function (value) {
          return value.length > 6;
        },
        message: "Password must have at least 6 characters.",
      },
    },
  },
  { timestamps: true }
);

// The rest of your code remains the same
const User = mongoose.model("User", userSchema);

export default User;
