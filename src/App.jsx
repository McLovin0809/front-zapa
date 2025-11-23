<<<<<<< HEAD
import { publicLinks } from './data/navbarPublicLinks';
import { adminLinks } from './data/navbarAdminLinks';
import Navbar from './components/organisms/Navbar';
import Home from './pages/user/Home';
import HomeAdmin from './pages/admin/HomeAdmin';
import AuthPanel from './pages/auth/AuthPanel';
=======
>>>>>>> 29a4d67ab92f48b29f0bef22bedf7b45bc727dd0
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/organisms/Navbar";
import { publicLinks } from "./data/navbarPublicLinks";
import Home from "./pages/user/Home";
import AuthPanel from "./pages/auth/AuthPanel";

function App() {
  return (
    <>
      <Navbar links={publicLinks} title="ZAPA STORE" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPanel />} />
        <Route path="/register" element={<AuthPanel />} />
        <Route path="/Admin/HomeAdmin" element={<HomeAdmin />} />
      </Routes>
    </>
  );
}

export default App;
