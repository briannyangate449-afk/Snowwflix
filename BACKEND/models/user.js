const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      sparse: true, // allows multiple nulls but unique when present
    },
    displayName: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      default: "",
      trim: true,
    },
    lastName: {
      type: String,
      default: "",
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    photoURL: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      default: "password", // "password" | "google" | etc.
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Optional: nice virtual for full name
userSchema.virtual("fullName").get(function () {
  return [this.firstName, this.lastName].filter(Boolean).join(" ") || this.displayName || this.username;
});

module.exports = mongoose.model("User", userSchema);
