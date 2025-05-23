const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  progress: {
    currentEpisode: {
      type: Number,
      default: 0,
    },
    currentSeason: {
      type: Number,
    },
  },
  rating: {
    type: Number, 
    min: 0,
    max: 10,
  },
  review: {
    type: String, // avis texte
  },
});

module.exports = mongoose.model("Anime", animeSchema);
