import { lazy } from "react";

// Lazy loading de páginas
const Home = lazy(() => import("../pages/user/Home"));
const Contact = lazy(() => import("../pages/user/Contact"));
const HomeAdmin = lazy(() => import("../pages/admin/HomeAdmin"));
const PerfilUsuario = lazy(() => import("../pages/user/PerfilUsuario"));
const AuthPanel = lazy(() => import("../pages/auth/AuthPanel"));
const AddProduct = lazy(() => import("../pages/admin/AddProduct"));
const Carrito = lazy(() => import("../pages/user/Carrito"));
const About = lazy(() => import("../pages/user/About"));

export const publicRoutes = [
  { path: "/", element: <Home />, showNavbar: true },
  { path: "/about", element: <About />, showNavbar: true },
  { path: "/contact", element: <Contact />, showNavbar: true },
  { path: "/login", element: <AuthPanel />, showNavbar: false },
  { path: "/register", element: <AuthPanel />, showNavbar: false },
  { path: "/perfil", element: <PerfilUsuario />, showNavbar: true },
  { path: "/carrito", element: <Carrito />, showNavbar: true },
];

export const adminRoutes = [
  { path: "/admin/HomeAdmin", element: <HomeAdmin />, isAdmin: true },
  { path: "/admin/AddProduct", element: <AddProduct />, isAdmin: true },
];

export const notFoundRoute = {
  path: "*",
  element: <div className="text-center py-10 text-2xl">404 - Página no encontrada u.u</div>,
  showNavbar: false,
};

export const appRoutes = [...publicRoutes, ...adminRoutes, notFoundRoute];
