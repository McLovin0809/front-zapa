import { publicLinks } from './data/navbarPublicLinks';
import Navbar from './components/organisms/Navbar';

function App() {
  return (
    <>
      <Navbar links={publicLinks} title="" />
    </>
  );
}

export default App;