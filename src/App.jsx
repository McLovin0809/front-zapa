import { publicLinks } from './data/navbarPublicLinks';
import { adminLinks } from './data/navbarAdminLinks';
import Navbar from './components/organisms/Navbar';
import Home from './pages/user/Home';
import HomeAdmin from './pages/admin/HomeAdmin';
import AuthPanel from './pages/auth/AuthPanel';
import { Routes, Route } from "react-router-dom";

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
