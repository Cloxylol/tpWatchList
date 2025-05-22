import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) return null;

const user = jwtDecode(token);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav>
            <div>
                <Link to="/home"> Accueil</Link>
                <button onClick={handleLogout}>Logout</button>
                <p>Bonjour {user.prenom} {user.nom} !</p>
            </div>
        </nav>
    );
};

export default Navbar;
