import { Routes, Route } from "react-router-dom";
import { publicLinks } from "./data/navbarPublicLinks";
import Navbar from "./components/organisms/Navbar";
import Home from "./pages/user/Home";
import Contact from "./pages/user/Contact";
import HomeAdmin from "./pages/admin/HomeAdmin";
import PerfilUsuario from "./pages/user/PerfilUsuario";
import AuthPanel from "./pages/auth/AuthPanel";
import AddProduct from "./pages/admin/AddProduct";
import Carrito from "./pages/user/Carrito";
import "./style/components/Toast.css";
import About from "./pages/user/About";

function App() {
  return (
    <>
      <Navbar links={publicLinks} title="ZAPA STORE" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<AuthPanel />} />
        <Route path="/register" element={<AuthPanel />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/Admin/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/admin/AddProduct" element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
