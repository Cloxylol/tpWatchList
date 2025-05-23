import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AnimeDetail = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/animes/${id}`);
                setAnime(res.data);
            } catch (error) {
                console.error("Erreur de chargement de l'anime", error);
            }
        };

        fetchAnime();
    }, [id]);

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
            <p><strong>Description :</strong> {anime.description}</p>
            <p><strong>Catégorie :</strong> {anime.category}</p>
            <p><strong>Note :</strong> {anime.rating}</p>
            <p><strong>Avis :</strong> {anime.review}</p>
            <p><strong>Episode :</strong> {anime.progress.currentEpisode} / {anime.progress.totalEpisodes}</p>
            <p><strong>Auteur :</strong> {anime.author?.prenom} {anime.author?.nom}</p>
            </div>
        </div>
        </div>
    );
};

export default AnimeDetail;
