const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    username: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    displayName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    photoURL: { type: String },
    provider: { type: String, default: "password" },
    isAdmin: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
