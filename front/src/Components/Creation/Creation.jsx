import AnimeForm from "../AnimeForm/AnimeForm";
import axios from "axios";

const Creation = () => {
    const token = localStorage.getItem("token");

    const handleCreate = (data) => {
        axios.post("http://localhost:8080/animes/create", {
            ...data,
            progress: {
                currentEpisode: data.currentEpisode,
                currentSeason: data.currentSeason
            }
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => alert("Anime créé !"))
            .catch(err => alert("Erreur : " + err.message));
    };

    return <AnimeForm onSubmit={handleCreate} submitLabel="Ajouter" />;
};

export default Creation;
