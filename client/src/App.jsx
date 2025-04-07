import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Layouts/Nav.jsx";
import Home from "./Components/Home.jsx";
import Estate from "./Components/Estate.jsx"
import EstateDetails from "./Components/EstateDetails.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AboutUs from "./Components/Aboutus.jsx";
import "./css/Navbar.css";

function App() {

  return (

      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estate" element={<Estate />} />
          <Route path="/estate/:id" element={<EstateDetails />} />
          <Route path="/about" element={<div><AboutUs/></div>} />
          <Route path="/profile" element={<ProfilePage />} />
          
        </Routes>
      </div>

  );
}

export default App;