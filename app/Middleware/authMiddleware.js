const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ error: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).send({ error: "Utilisateur introuvable" });
    }

    req.user = {
      _id: user._id,
      prenom: user.prenom,
      nom: user.nom,
      email: user.email,
    };
    console.log("Utilisateur authentifié :", req.user);
    next();
  } catch (error) {
    console.error("Erreur auth :", error.message);
    res.status(401).send({ error: "Veuillez vous authentifier." });
  }
};

module.exports = authMiddleware;
