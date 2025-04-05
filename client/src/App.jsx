import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Layout from "./Layout/Layout.jsx";
// import Navbar from "./Components/Navbar.jsx";
// import Home from "./Pages/Home.jsx";
// import Cart from "./Components/Cart.jsx";








function App() {
    <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
        <Route element={<Layout />}>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/properties" element={<Properties />} /> */}
      
       
        {/* <Route path="/cart" element={<Cart />} /> */}
 </Route>
        </Routes>
      </BrowserRouter>



=======
import Navbar from "./Components/Nav.jsx";
import Home from "./Components/Home.jsx";
import "./css/Navbar.css";

function App() {
>>>>>>> 74447198f0f0c155b88ce4b4b26076b5630a0047
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estate" element={<div>Estate Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;