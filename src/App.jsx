import { Routes, Route } from "react-router-dom";
import { publicLinks } from './data/navbarPublicLinks';
import { adminLinks } from './data/navbarAdminLinks';
import Navbar from './components/organisms/Navbar';
import Home from './pages/user/Home';
import HomeAdmin from './pages/admin/HomeAdmin';
import AddProduct from "./pages/admin/AddProduct";
import AuthPanel from './pages/auth/AuthPanel';
import "./style/components/toast.css";


function App() {
  return (
    <>
      <Navbar links={publicLinks} title="ZAPA STORE" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPanel />} />
        <Route path="/register" element={<AuthPanel />} />
        <Route path="/Admin/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/admin/AddProduct" element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
