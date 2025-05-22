const express = require("express");
const {
  createAnime,
  getAllAnimes,
  deleteAnime,
  updateAnime,
  getAnimeById,
  updateProgress,
  searchAnimes
} = require("../Controllers/animeController");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createAnime);
router.get("/getAllAnimes", authMiddleware, getAllAnimes);
router.delete("/delete/:id", authMiddleware, deleteAnime);
router.put("/update/:id", authMiddleware, updateAnime);
router.get("/search", authMiddleware, searchAnimes);
router.get("/:id", getAnimeById);
router.patch("/:id/progress", authMiddleware, updateProgress); // pour currentEpisode
//router.patch("/:id/rating", authMiddleware, updateRating);     // pour rating

module.exports = router;
