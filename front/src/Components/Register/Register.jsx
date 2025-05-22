import axios, { AxiosHeaders } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(prenom);
  }, [prenom, nom, email]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !prenom || !nom) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        {
          email,
          password,
          prenom,
          nom,
        }
      );
      alert("Registration successful");
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="prenom">Prenom:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
