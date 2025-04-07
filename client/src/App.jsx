import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Layouts/Nav.jsx";
import Home from "./Components/Home.jsx";
import ProfilePage from "./pages/ProfilePage.jsx"
import "./css/Navbar.css";

function App() {
  return (

      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estate" element={<div>Estate Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/profile" element={<ProfilePage />} />
          
        </Routes>
      </div>

  );
}

export default App;