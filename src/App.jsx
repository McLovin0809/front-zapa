import { publicLinks } from './data/navbarPublicLinks';
import Navbar from './components/organisms/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './pages/user/Home';
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