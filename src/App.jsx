import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { PublicLinks } from "./data/navbarPublicLinks";
import { AdminLinks } from "./data/navbarAdminLinks";
import Navbar from "./components/organisms/Navbar";
import { appRoutes } from "./routes/config";

function Layout() {
  const location = useLocation();

  // Convertimos a minúsculas para evitar problemas con mayúsculas
  const path = location.pathname.toLowerCase();
  const isAdminRoute = path.startsWith("/admin");

  const currentRoute = appRoutes.find(
    route => route.path.toLowerCase() === path
  );

  const showNavbar = isAdminRoute || currentRoute?.showNavbar;

  const navbarTitle = isAdminRoute ? "ZAPA STORE Admin" : "ZAPA STORE";

  return (
    <>
      {showNavbar && (
        <Navbar
          links={isAdminRoute ? AdminLinks : PublicLinks}
          title={navbarTitle}
          isAdmin={isAdminRoute}
          adminLinks={AdminLinks}
        />
      )}

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
