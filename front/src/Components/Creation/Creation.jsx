import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Creation = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [currentEpisode, setCurrentEpisode] = useState(0);
    const [totalEpisodes, setTotalEpisodes] = useState(0);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const token = localStorage.getItem("token");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                "http://localhost:8080/animes",
                {
                    title,
                    description,
                    category,
                    progress: {
                        currentEpisode,
                        totalEpisodes,
                    },
                    rating,
                    review,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // si le back est protégé
                    },
                }
            )
            .then(() => {
                alert("Anime créé !");
                setTitle("");
                setDescription("");
                setCategory("");
                setCurrentEpisode(0);
                setTotalEpisodes(0);
                setRating(0);
                setReview("");
            })
            .catch((err) => {
                console.error(err);
                alert("Erreur lors de la création");
            });
    };

    return (
        <div className="page-container">
            <div className="card">
                <h2>Créer un nouvel anime</h2>
                <form onSubmit={handleSubmit}>
                    <label>Titre</label>
                    <input
                        type="text"
                        placeholder="Ex : Jujutsu Kaisen"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Résumé rapide de l'anime"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <label>Catégorie</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Choisir une catégorie</option>
                        <option value="Action">Action</option>
                        <option value="Comédie">Comédie</option>
                        <option value="Drame">Drame</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Romance">Romance</option>
                        <option value="Horreur">Horreur</option>
                        <option value="Slice of Life">Slice of Life</option>
                    </select>

                    <label>Épisode actuel</label>
                    <input
                        type="number"
                        placeholder="Ex : 5"
                        value={currentEpisode}
                        onChange={(e) => setCurrentEpisode(parseInt(e.target.value))}
                        min="0"
                    />

                    <label>Nombre total d'épisodes</label>
                    <input
                        type="number"
                        placeholder="Ex : 12"
                        value={totalEpisodes}
                        onChange={(e) => setTotalEpisodes(parseInt(e.target.value))}
                        min="1"
                    />

                    <label>Note (sur 10)</label>
                    <input
                        type="number"
                        placeholder="Ex : 8.5"
                        value={rating}
                        onChange={(e) => setRating(parseFloat(e.target.value))}
                        min="0"
                        max="10"
                        step="0.1"
                    />

                    <label>Ton avis</label>
                    <textarea
                        placeholder="Donne ton avis ici..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        rows={4}
                    />

                    <button type="submit">Créer l'anime</button>
                </form>
            </div>
        </div>
    );
};

export default Creation;
