const express = require("express");
const {
    registerUser,
    loginUser,
    getUsers
  } = require("../Controllers/UserController");

const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");

// POST /users/register
router.post("/register", registerUser);
// POST /users/login
router.post("/login", loginUser);

// Protéger cette route avec le middleware
router.get("/all", authMiddleware, getUsers);

module.exports = router;
