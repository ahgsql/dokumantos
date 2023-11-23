import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LangProvider from "./context/LangProvider";
import AddPage from "./pages/AddPage";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Page from "./pages/Page";
import Favourites from "./pages/Favourites";
import MostVisited from "./pages/MostVisited";

function App() {
  return (
    <>
      <LangProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/category/:slug" element={<Category />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/favourites" element={<Favourites />}></Route>
          <Route path="/mostclicked" element={<MostVisited />}></Route>
          <Route path="/add" element={<AddPage />}></Route>
          <Route path="/page/:slug" element={<Page />}></Route>
        </Routes>
      </LangProvider>
    </>
  );
}

export default App;
