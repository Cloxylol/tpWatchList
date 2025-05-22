import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !prenom || !nom) {
      alert("Merci de remplir tous les champs");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/users/register", {
        email,
        password,
        prenom,
        nom,
      });
      alert("Inscription réussie !");
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Erreur pendant l'inscription :", error);
      alert("Une erreur est survenue. Vérifie les champs ou réessaie plus tard.");
    }
  };

  return (
    <div className="page-container">
      <div className="login-card">
        <h2>Créer un compte</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Inscription</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
