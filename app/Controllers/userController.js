const bcrypt = require("bcryptjs");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).send({ error: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).send({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        prenom: user.prenom,  
        nom: user.nom         
      },
      process.env.JWT_SECRET, // 
      { expiresIn: "1d" } // 
    );

    res.status(200).send({ message: "Connexion réussi", token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
