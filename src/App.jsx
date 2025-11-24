import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { publicLinks } from './data/navbarPublicLinks';
import { adminLinks } from './data/navbarAdminLinks';
import Navbar from './components/organisms/Navbar';
import { appRoutes } from './routes/config';

function Layout() {
  const location = useLocation();

  // Detectar si la ruta es de admin
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  // Buscar la ruta actual
  const currentRoute = appRoutes.find(
    (route) => route.path.toLowerCase() === location.pathname.toLowerCase()
  );

  // Mostrar navbar si es admin o si la ruta tiene showNavbar: true
  const showNavbar = isAdminRoute || currentRoute?.showNavbar || false;

  // Links para el navbar
  const navbarLinks = isAdminRoute ? adminLinks : publicLinks;

  return (
    <>
      {showNavbar && <Navbar links={navbarLinks} />}

      <main>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
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
