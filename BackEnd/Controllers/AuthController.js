const bcrypt = require("bcrypt");
const UserModel = require("../Models/User");
const JWT = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, please log in.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "Signed up successfully.",
      success: true,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Wrong email or password..",
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual)
      return res.status(403).json({
        message: "Wrong email or password..",
        success: false,
      });
    const jwtToken = JWT.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login successful...",
      success: true,
      jwtToken,
      email,
      email,
      name: user.name,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
        title: user.title,
        socialLinks: user.socialLinks
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { name, bio, title, socialLinks, profileImage } = req.body;
    const { _id } = req.user; // from auth middleware

    // Validate if necessary, but optional fields can be empty strings

    // Construct update object to avoid overwriting with undefined
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (title !== undefined) updateData.title = title;
    if (socialLinks !== undefined) updateData.socialLinks = socialLinks;
    if (profileImage !== undefined) updateData.profileImage = profileImage;

    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.user; // from auth middleware

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPassEqual = await bcrypt.compare(oldPassword, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ success: false, message: "Incorrect old password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error("Change Password Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { _id } = req.user;
    const deletedUser = await UserModel.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete Account Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getMe = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await UserModel.findById(_id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Get Me Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  updateProfile,
  changePassword,
  deleteAccount,
  getMe,
};

