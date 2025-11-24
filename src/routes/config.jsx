import { lazy } from 'react';

const Home = lazy(() => import('../pages/user/Home'));
const About = lazy(() => import('../pages/user/About'));
const Contact = lazy(() => import('../pages/user/Contact'));
const PerfilUsuario = lazy(() => import('../pages/user/PerfilUsuario'));
const ProductosUser = lazy(() => import('../pages/user/ProductosUser'));

const AuthPanel = lazy(() => import('../pages/auth/AuthPanel'));

const HomeAdmin = lazy(() => import('../pages/admin/HomeAdmin'));
const AddProduct = lazy(() => import('../pages/admin/AddProduct'));

const publicRoutes = [
  { path: '/', element: <Home />, showNavbar: true },
  { path: '/about', element: <About />, showNavbar: true },
  { path: '/contact', element: <Contact />, showNavbar: true },
  { path: '/login', element: <AuthPanel />, showNavbar: false },
  { path: '/register', element: <AuthPanel />, showNavbar: false },
  { path: '/perfil', element: <PerfilUsuario />, showNavbar: true },
  { path: '/ProductosUser', element: <ProductosUser />, showNavbar: true },
];

const adminRoutes = [
  { path: '/Admin/HomeAdmin', element: <HomeAdmin />, isAdmin: true, showNavbar: true },
  { path: '/admin/AddProduct', element: <AddProduct />, isAdmin: true, showNavbar: true },
];


const notFoundRoute = {
  path: '*',
  element: <div className="text-center py-10 text-2xl">404 - Página no encontrada u.u</div>,
  showNavbar: false,
};

// Exportar todas las rutas en un solo arreglo
export const appRoutes = [...publicRoutes, ...adminRoutes, notFoundRoute];
