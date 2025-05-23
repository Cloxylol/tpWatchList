import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AnimeForm = ({ initialData = {}, onSubmit, submitLabel = "Ajouter" }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        currentEpisode: 0,
        currentSeason: 0,
        rating: 0,
        review: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(initialData).length > 0) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                category: initialData.category || "",
                currentEpisode: initialData.progress?.currentEpisode || 0,
                currentSeason: initialData.progress?.currentSeason || 0,
                rating: initialData.rating || 0,
                review: initialData.review || ""
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "currentEpisode" || name === "currentSeason"
                ? parseInt(value)
                : name === "rating"
                    ? parseFloat(value)
                    : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        navigate("/home");
    };

    return (
        <div className="page-container">
            <div className="card">
                <h2>{submitLabel === "Ajouter" ? "Créer un nouvel anime" : "Modifier l'anime"}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Titre</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Ex : Jujutsu Kaisen"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <label>Catégorie</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
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

                    <label>Épisode actuel</label>
                    <input
                        type="number"
                        name="currentEpisode"
                        value={formData.currentEpisode}
                        onChange={handleChange}
                        min="0"
                    />

                    <label>Saison actuelle</label>
                    <input
                        type="number"
                        name="currentSeason"
                        value={formData.currentSeason}
                        onChange={handleChange}
                        min="1"
                    />

                    <label>Note (sur 10)</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="0"
                        max="10"
                        step="0.1"
                    />

                    <label>Ton avis</label>
                    <textarea
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        rows={4}
                    />

                    <button type="submit">{submitLabel}</button>
                </form>
            </div>
        </div>
    );
};

export default AnimeForm;
