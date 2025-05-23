import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnimeForm from "../AnimeForm/AnimeForm";

const Edition = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`http://localhost:8080/animes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setAnime(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur chargement anime :", err);
                setLoading(false);
            });
    }, [id, token]);

    const handleUpdate = (data) => {
        axios.put(`http://localhost:8080/animes/update/${id}`, {
            title: data.title,
            description: data.description,
            category: data.category,
            currentEpisode: data.currentEpisode,
            currentSeason: data.currentSeason,
            rating: data.rating,
            review: data.review
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => alert("Anime modifié avec succès !"))
            .catch((err) => alert("Erreur lors de la modification : " + err.message));
    };

    if (loading) return <p>Chargement...</p>;
    if (!anime) return <p>Erreur : anime introuvable</p>;

    return <AnimeForm initialData={anime} onSubmit={handleUpdate} submitLabel="Modifier" />;
};

export default Edition;
