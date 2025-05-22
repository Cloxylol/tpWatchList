const express = require("express");
const {
  createAnime,
  getAllAnimes,
  deleteAnime,
  updateAnime,
  getAnimeById,
  updateProgress
} = require("../Controllers/animeController");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createAnime);
router.get("/getAllAnimes", getAllAnimes);
router.delete("/delete/:id", authMiddleware, deleteAnime);
router.put("/update/:id", authMiddleware, updateAnime);
router.get("/:id", getAnimeById);
router.patch("/:id/progress", authMiddleware, updateProgress); // pour currentEpisode
//router.patch("/:id/rating", authMiddleware, updateRating);   // pour rating

module.exports = router;
