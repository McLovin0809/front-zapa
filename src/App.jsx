import { publicLinks } from './data/navbarPublicLinks';
import Navbar from './components/organisms/Navbar';
import Home from './pages/user/Home';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar links={publicLinks} title="" />
      <Routes>
       <Route path="/" element={<Home />} />
     </Routes>
    </>
  );
}

export default App;