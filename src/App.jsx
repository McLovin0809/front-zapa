import { publicLinks } from './data/navbarPublicLinks';
import Navbar from './components/organisms/Navbar';
import Home from './pages/user/Home';
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
      </Routes>
    </>
  );
}

export default App;
