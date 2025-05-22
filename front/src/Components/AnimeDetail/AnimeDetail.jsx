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
        <div>
            <h1>{anime.title}</h1>
            <p><strong>Description :</strong> {anime.description}</p>
            <p><strong>Catégorie :</strong> {anime.category}</p>
            <p><strong>Auteur :</strong> {anime.author?.prenom} {anime.author?.nom}</p>
        </div>
    );
};

export default AnimeDetail;
