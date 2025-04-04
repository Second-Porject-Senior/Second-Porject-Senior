import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
// import Navbar from "./Components/Navbar.jsx";
import Categories from "./Components/Category.jsx";
// import Home from "./Pages/Home.jsx";
// import Cart from "./Components/Cart.jsx";








function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
        <Route element={<Layout />}>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/properties" element={<Properties />} /> */}
        <Route path="/categories" element={<Categories />} />
       
        {/* <Route path="/cart" element={<Cart />} /> */}
 </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;