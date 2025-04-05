import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Nav.jsx";
import Home from "./Components/Home.jsx"; 
import Estate from "./Components/Estate.jsx"
import "./css/Navbar.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estate" element={<Estate />} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;