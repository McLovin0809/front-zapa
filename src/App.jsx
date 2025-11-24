import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { publicLinks } from './data/navbarPublicLinks';
import { adminLinks } from './data/navbarAdminLinks';
import Navbar from './components/organisms/Navbar';
import { appRoutes } from './routes/config';

function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  const currentRoute = appRoutes.find(
    (route) => route.path.toLowerCase() === location.pathname.toLowerCase()
  );

  const showNavbar = isAdminRoute || currentRoute?.showNavbar || false;


  const navbarLinks = isAdminRoute ? adminLinks : publicLinks;

  return (
    <>
      {showNavbar && <Navbar links={navbarLinks} />}

      <main>
        <Suspense
          fallback={
            <div className="">
              <div className=""></div>
            </div>
          }
        >
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

function App() {
  return <Layout />;
}

export default App;