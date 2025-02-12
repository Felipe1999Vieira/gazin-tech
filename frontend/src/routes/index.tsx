import { Routes, Route } from "react-router-dom";
import Desenvolvedores from "../pages/desenvolvedores/Desenvolvedores";
import Home from "../pages/home/Home";
import EditDesenvolvedores from "../pages/desenvolvedores/EditDesenvolvedores";
import AddDesenvolvedores from "../pages/desenvolvedores/AddDesenvolvedores";
import Niveis from "../pages/niveis/Niveis";
import EditNiveis from "../pages/niveis/EditNiveis";
import AddNiveis from "../pages/niveis/AddNiveis";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/desenvolvedores" element={<Desenvolvedores />} />
      <Route path="/desenvolvedores/:id" element={<EditDesenvolvedores />} />
      <Route path="/desenvolvedores/add" element={<AddDesenvolvedores />} />
      <Route path="/niveis" element={<Niveis />} />
      <Route path="/niveis/:id" element={<EditNiveis />} />
      <Route path="/niveis/add" element={<AddNiveis />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
