import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [animes, setanimes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editAnimeId, setEditAnimeId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newAnime, setNewAnime] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    fetchanimes();
  }, []);

  const fetchanimes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/animes/getAllAnimes"
      );
      setanimes(response.data);
    } catch (error) {
      console.error("Error fetching animes:", error);
    }
  };

  const handleEdit = (anime) => {
    setIsEditing(true);
    setEditAnimeId(anime._id);
    setNewAnime({
      title: anime.title,
      description: anime.description,
      category: anime.category,
    });
  };

  const updateAnime = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/animes/update/${editAnimeId}`,
        newAnime,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      setEditAnimeId(null);
      setNewAnime({ title: "", description: "", category: "" });
      fetchanimes();
    } catch (error) {
      console.error("Erreur update :", error);
    }
  };


  const deleteAnime = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to delete a Anime.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/animes/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Anime deleted successfully");
      fetchanimes(); // refresh la liste après suppression
    } catch (error) {
      console.error("Error deleting Anime:", error.response?.data || error.message);
    }
  };


  const createAnime = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to create a Anime.");
      return;
    }

    console.log(newAnime);

    try {
      const response = await axios.post(
        "http://localhost:8080/animes/create",
        newAnime,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Anime created successfully");
      setanimes([...animes, response.data]); // 
      setNewAnime({ title: "", description: "", category: "" });
    } catch (error) {
      console.error("Error creating Anime:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Welcome to AnimeList App</h1>


      <h2>Liste de tes Animes</h2>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Toutes les catégories</option>
        <option value="immobilier">Immobilier</option>
        <option value="emploi">Meuble</option>
        <option value="informatique">Informatique</option>
        <option value="loisir">Loisir</option>
      </select>
      <div className="animes-container">
        {animes
          .filter((a) => selectedCategory === "" || a.category === selectedCategory)
          .map((anime) => (
            <div className="anime-card" key={anime._id}>
              <h3>{anime.title}</h3>
              <p>{anime.description}</p>
              <p>Catégorie : {anime.category}</p>
              <button onClick={() => deleteAnime(anime._id)}>Supprimer</button>
              <button onClick={() => handleEdit(anime)}>Modifier</button>
              <Link to={`/anime/${anime._id}`}>
                <button>Voir l'anime</button>
              </Link>
            </div>
          ))}
      </div>
      <div>
        <h2>Enregistrer un nouvel animé</h2>
        <input
          type="text"
          placeholder="Title"
          value={newAnime.title}
          onChange={(e) =>
            setNewAnime({ ...newAnime, title: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Description"
          value={newAnime.description}
          onChange={(e) =>
            setNewAnime({ ...newAnime, description: e.target.value })
          }
        />

        <select
          value={newAnime.category}
          onChange={(e) =>
            setNewAnime({ ...newAnime, category: e.target.value })
          }
        >
          <option value="">Catégorie :</option>
          <option value="Immobilier">Immobilier</option>
          <option value="Emploi">Meuble</option>
          <option value="Informatique">Informatique</option>
          <option value="Loisir">Loisir</option>
        </select>


        <button onClick={isEditing ? updateAnime : createAnime}>
          {isEditing ? "Mettre à jour" : "Créer l'anime"}
        </button>
      </div>
    </div>
  );
};

export default Home;
