import { publicLinks } from './data/navbarPublicLinks';
import Navbar from './components/organisms/Navbar';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar links={publicLinks} title="" />
      
    </>
  );
}

export default App;