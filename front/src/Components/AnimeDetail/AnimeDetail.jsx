import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const AnimeDetail = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const deleteAnime = async () => {
        try {
            await axios.delete(`http://localhost:8080/animes/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Anime supprimé !");
            navigate("/home");
        } catch (error) {
            console.error("Erreur suppression :", error);
            alert("Erreur lors de la suppression");
        }
    };

    const fetchAnime = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/animes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnime(res.data);
        } catch (error) {
            console.error("Erreur de chargement de l'anime", error);
        }
    };

    useEffect(() => {
        fetchAnime();
    }, [id]);

    const updateField = async (field) => {
        try {
            const updatedValue = anime.progress[field] + 1;

            const payload =
                field === "currentEpisode"
                    ? { currentEpisode: updatedValue }
                    : {
                        currentSeason: updatedValue,
                        currentEpisode: 1
                    };

            console.log("Payload envoyé :", payload);

            await axios.patch(`http://localhost:8080/animes/${id}/progress`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchAnime();
        } catch (err) {
            console.error("Erreur de mise à jour :", err);
        }
    };


    if (!anime) return <p>Chargement...</p>;

    return (
        <div className="anime-detail">
            <h1 className="anime-title">{anime.title}</h1>

            <div className="anime-detail-content">
                <img
                    src="https://fr.web.img5.acsta.net/pictures/19/08/01/09/52/4803203.jpg"
                    alt={anime.title}
                    className="anime-detail-image"
                />

                <div className="anime-info">
                    <p><strong>Catégorie :</strong> {anime.category}</p>
                    <p><strong>Note :</strong> {anime.rating}</p>
                    <p><strong>Avis :</strong> {anime.review}</p>

                    <p>
                        <strong>Episode :</strong> {anime.progress.currentEpisode}
                        <button onClick={() => updateField("currentEpisode")} style={{ marginLeft: "10px" }}>➕</button>
                    </p>

                    <p>
                        <strong>Saison :</strong> {anime.progress.currentSeason}
                        <button onClick={() => updateField("currentSeason")} style={{ marginLeft: "10px" }}>➕</button>
                    </p>

                    <p><strong>Carte créée par :</strong> {anime.author?.prenom} {anime.author?.nom}</p>

                    <div >
                        <button onClick={deleteAnime}>Supprimer</button>
                        <Link to={`/edit/${id}`}>
                            <button>Modifier</button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AnimeDetail;
