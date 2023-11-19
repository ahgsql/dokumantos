import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Categories from "./pages/Categories";
import AddPage from "./pages/AddPage";
import Page from "./pages/Page";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/category/:slug" element={<Category />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/add" element={<AddPage />}></Route>
        <Route path="/page/:slug" element={<Page />}></Route>
      </Routes>
    </>
  );
}

export default App;
