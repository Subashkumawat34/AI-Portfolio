const bcrypt = require("bcrypt");
const router = require("express").Router();
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");
const ensureAuthenticated = require("../Middlewares/Auth");
const { signup, login, updateProfile, changePassword, deleteAccount, getMe } = require("../Controllers/AuthController");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.put("/update-profile", ensureAuthenticated, updateProfile);
router.put("/change-password", ensureAuthenticated, changePassword);
router.delete("/delete-account", ensureAuthenticated, deleteAccount);
router.get("/me", ensureAuthenticated, getMe);

module.exports = router;
