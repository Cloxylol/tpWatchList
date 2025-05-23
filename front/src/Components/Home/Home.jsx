import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [animes, setanimes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const animesPerPage = 4;

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
      alert("You need to be logged in to delete an Anime.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/animes/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Anime deleted successfully");
      fetchanimes();
    } catch (error) {
      console.error("Error deleting Anime:", error.response?.data || error.message);
    }
  };

  const filteredAnimes = animes
    .filter((a) => selectedCategory === "" || a.category === selectedCategory)
    .filter((a) => a.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLast = currentPage * animesPerPage;
  const indexOfFirst = indexOfLast - animesPerPage;
  const currentAnimes = filteredAnimes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAnimes.length / animesPerPage);

  return (
    <div className="anime-list-container">
      <h1>Liste de tes Animes</h1>
      <div className="anime-list-nav">
        <button className="btn-primary" onClick={() => navigate("/creation")}>+ Ajouter</button>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="anime-filter"
        >
          <option value="">Choisir une catégorie</option>
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

        <input
          type="text"
          placeholder="Recherche"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="anime-search"
        />
      </div>

      <div className="animes-container">
        {currentAnimes.map((anime) => (
          <div className="anime-card" key={anime._id}>
            <div className="anime-left">
              <img
                src="https://fr.web.img5.acsta.net/pictures/19/08/01/09/52/4803203.jpg"
                alt={anime.title}
                className="anime-image"
              />
            </div>

            <div className="anime-center">
              <h3>{anime.title}</h3>
              <p>{anime.description}</p>
              <p>Catégorie : {anime.category}</p>
            </div>

            <div className="anime-right">
              <button className="btn-primary" onClick={() => deleteAnime(anime._id)}>Supprimer</button>
              <Link to={`/edit/${anime._id}`}>
                <button className="btn-primary">Modifier</button>
              </Link>
              <Link to={`/anime/${anime._id}`}>
                <button className="btn-primary">Voir l'anime</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn-primary pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
