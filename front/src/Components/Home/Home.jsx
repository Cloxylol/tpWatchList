import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [animes, setanimes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchanimes();
  }, []);

  const fetchanimes = async () => {
  try {
    const response = await axios.get("http://localhost:8080/animes/getAllAnimes", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setanimes(response.data);
  } catch (error) {
    console.error("Error fetching animes:", error);
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


  return (
    <div>
      <h1>Welcome to AnimeList App</h1>

      
      <h2>Liste de tes Animes</h2>
      <button onClick={() => navigate("/creation")}>Enregistrer une série</button>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
                        <option value="Shonen">Shonen</option>
                        <option value="Shojo">Shojo</option>
                        <option value="Seinen">Seinen</option>
                        <option value="Mecha">Mecha</option>
                        <option value="Horreur">Horreur</option>
                        <option value="Comédie">Comédie</option>
                        <option value="Drame">Drame</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Romance">Romance</option>
                        <option value="Sport">Sport</option>
                        <option value="Mystère">Mystère</option>
                        <option value="Science-fiction">Science-fiction</option>
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
              <Link to={`/anime/${anime._id}`}>
                <button>Voir l'anime</button>
              </Link>
            </div>
          ))}
      </div>
      
    </div>
  );
};

export default Home;
