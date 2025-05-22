import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import AnimeDetail from "./Components/AnimeDetail/AnimeDetail";
import Navbar from "./Components/Navbar/Navbar";
import Creation from "./Components/Creation/Creation";



function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/creation" element={<Creation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
