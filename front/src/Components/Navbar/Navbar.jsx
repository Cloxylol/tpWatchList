import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../App.css";


export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const isValidToken = token && token !== "undefined" && token !== "null";
    let prenom = "";

    try {
        if (isValidToken) {
            const decoded = jwtDecode(token);
            prenom = decoded.prenom || decoded.name || "";
        }
    } catch (err) {
        console.warn("Token invalide, suppression...");
        localStorage.removeItem("token");
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-left">
                <span className="navbar-logo">TpWatchList</span>
            </div>

            <div className="navbar-buttons">

                {isValidToken ? (
                    <>
                        <button onClick={() => navigate("/home")}>Accueil</button>
                        <button onClick={handleLogout}>Logout</button>
                        <span className="navbar-welcome">Bonjour {prenom} !</span>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate("/")}>Login</button>
                        <button onClick={() => navigate("/register")}>Register</button>
                    </>
                )}
            </div>
        </nav>
    );
}
