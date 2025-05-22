const AnimeModel = require("../Models/animeModel");

const createAnime = async (req, res) => {
  try {
    const newAnime = new AnimeModel({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      author: req.user._id,
      progress: {
        currentEpisode: req.body.currentEpisode || 0,
        totalEpisodes: req.body.totalEpisodes,
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
        description: req.body.description,
        category: req.body.category,
        progress: {
          currentEpisode: req.body.currentEpisode,
          totalEpisodes: req.body.totalEpisodes,
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

// ✅ Nouvelle fonction ajoutée pour PATCH /:id/progress
const updateProgress = async (req, res) => {
  try {
    const { currentEpisode } = req.body;

    const updatedAnime = await AnimeModel.findByIdAndUpdate(
      req.params.id,
      { "progress.currentEpisode": currentEpisode },
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

module.exports = {
  createAnime,
  getAllAnimes,
  deleteAnime,
  updateAnime,
  getAnimeById,
  updateProgress
};
