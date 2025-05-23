const AnimeModel = require("../Models/animeModel");

const createAnime = async (req, res) => {
  try {
    const newAnime = new AnimeModel({
      title: req.body.title,
      category: req.body.category,
      author: req.user._id,
      progress: {
        currentEpisode: req.body.currentEpisode || 0,
        currentSeason: req.body.currentSeason,
      },
      rating: req.body.rating,
      review: req.body.review,
    });

    await newAnime.save();
    res.status(201).send(newAnime);
  } catch (error) {
    console.error("Erreur création anime :", error.message);
    res.status(400).send({ error: error.message });
  }
};

const getAllAnimes = async (req, res) => {
  try {
    const animes = await AnimeModel.find({ author: req.user._id }).populate("author", "prenom nom");
    res.status(200).send(animes);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAnimeById = async (req, res) => {
  try {
    const anime = await AnimeModel.findById(req.params.id).populate("author", "prenom nom");
    if (!anime) {
      return res.status(404).send({ error: "Anime not found" });
    }
    res.status(200).send(anime);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteAnime = async (req, res) => {
  try {
    const deletedAnime = await AnimeModel.findByIdAndDelete(req.params.id);
    if (!deletedAnime) {
      return res.status(404).send({ error: "Anime not found" });
    }
    res.status(200).send({ message: "Anime supprimé", anime: deletedAnime });
  } catch (error) {
    console.error("Erreur suppression anime :", error.message);
    res.status(400).send({ error: error.message });
  }
};

const updateAnime = async (req, res) => {
  try {
    const updatedAnime = await AnimeModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: req.body.category,
        progress: {
          currentEpisode: req.body.currentEpisode,
          currentSeason: req.body.currentSeason,
        },
        rating: req.body.rating,
        review: req.body.review,
      },
      { new: true }
    );

    if (!updatedAnime) {
      return res.status(404).send({ error: "Anime not found" });
    }

    res.status(200).send(updatedAnime);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    console.log("PATCH reçu :", req.body);

    const updates = {};

    if (typeof req.body.currentEpisode !== "undefined") {
      updates["progress.currentEpisode"] = req.body.currentEpisode;
    }

    if (typeof req.body.currentSeason !== "undefined") {
      updates["progress.currentSeason"] = req.body.currentSeason;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).send({ error: "Aucune donnée de progression fournie." });
    }

    const updatedAnime = await AnimeModel.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    if (!updatedAnime) {
      return res.status(404).send({ error: "Anime non trouvé." });
    }

    res.status(200).send(updatedAnime);
  } catch (error) {
    console.error("Erreur PATCH /progress :", error);
    res.status(500).send({ error: error.message });
  }
};




const searchAnimes = async (req, res) => {
  try {
    const { name, category, rating } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // recherche insensible à la casse
    }

    if (category) {
      query.category = category;
    }

    if (rating) {
      query.rating = Number(rating); // attention : peut être égal strictement
      // Ou pour >= un seuil : query.rating = { $gte: Number(rating) }
    }

    const results = await AnimeModel.find(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAnime,
  getAllAnimes,
  deleteAnime,
  updateAnime,
  getAnimeById,
  updateProgress,
  searchAnimes
};
