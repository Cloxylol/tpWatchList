const express = require("express");
const {
  createAnime,
  getAllAnimes,
  deleteAnime,
  updateAnime,
  getAnimeById,
} = require("../Controllers/animeController");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createAnime);
router.get("/getAllAnimes", getAllAnimes);
router.delete("/delete/:id", authMiddleware, deleteAnime);
router.put("/update/:id", authMiddleware, updateAnime);
router.get("/:id", getAnimeById);

module.exports = router;
