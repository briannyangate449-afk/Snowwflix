const admin = require("firebase-admin");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
          : undefined,
      }),
    });
    console.log("✅ Firebase Admin initialized");
  } catch (err) {
    console.error("❌ Firebase Admin initialization failed:", err.message);
  }
}

exports.syncUser = async (req, res) => {
  try {
    const { idToken, extraData = {} } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "idToken is required" });
    }

    // Verify the Firebase ID token
    const decoded = await admin.auth().verifyIdToken(idToken);
    const {
      uid,
      email,
      name,
      picture,
      email_verified,
      firebase,
    } = decoded;

    // Find existing user by firebaseUid
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      // Create new user
      user = await User.create({
        firebaseUid: uid,
        email: email || "",
        displayName:
          name ||
          extraData.username ||
          (email ? email.split("@")[0] : "User"),
        username:
          extraData.username ||
          name ||
          (email ? email.split("@")[0] : "User"),
        firstName: extraData.firstName || "",
        lastName: extraData.lastName || "",
        phone: extraData.phone || "",
        photoURL: picture || "",
        provider: firebase?.sign_in_provider || "password",
        emailVerified: !!email_verified,
        lastLogin: new Date(),
      });
    } else {
      // Update existing user
      user.email = email || user.email;
      user.displayName = name || user.displayName;
      user.photoURL = picture || user.photoURL;
      user.emailVerified = !!email_verified;
      user.lastLogin = new Date();

      if (extraData.username) user.username = extraData.username;
      if (extraData.firstName) user.firstName = extraData.firstName;
      if (extraData.lastName) user.lastName = extraData.lastName;
      if (extraData.phone) user.phone = extraData.phone;

      await user.save();
    }

    // Issue your own JWT
    const token = jwt.sign(
      {
        id: user._id,
        firebaseUid: user.firebaseUid,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "User synced successfully",
      token,
      user: {
        id: user._id,
        firebaseUid: user.firebaseUid,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        photoURL: user.photoURL,
        isAdmin: user.isAdmin,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    console.error("Sync error:", error);
    res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
