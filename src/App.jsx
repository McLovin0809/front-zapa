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
        {/* Login y Register usan el mismo AuthPanel */}
        <Route path="/login" element={<AuthPanel />} />
        <Route path="/register" element={<AuthPanel />} />
      </Routes>
    </>
  );
}

export default App;
