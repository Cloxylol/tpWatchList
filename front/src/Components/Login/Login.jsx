import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/users/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        alert("Connexion réussie");
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        alert("Erreur lors de la connexion");
      });
  };

return (
  <div className="page-container">
    <div className="login-card">
      <h2>Connexion</h2>
      <div className="input-icon">
          <FontAwesomeIcon icon={faEnvelope} />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-icon">
        <FontAwesomeIcon icon={faLock} />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn-primary" onClick={handleLogin}>Connexion</button>
    </div>
  </div>
);


};

export default Login;
