import { lazy } from 'react';

const Home = lazy(() => import('../pages/user/Home'));
const About = lazy(() => import('../pages/user/About'));
const Contact = lazy(() => import('../pages/user/Contact'));
const PerfilUsuario = lazy(() => import('../pages/user/PerfilUsuario'));
const ProductosUser = lazy(() => import('../pages/user/ProductosUser'));
const Carrito = lazy(() => import('../pages/user/Carrito'));

const AuthPanel = lazy(() => import('../pages/auth/AuthPanel'));

const HomeAdmin = lazy(() => import('../pages/admin/HomeAdmin'));
const AddProduct = lazy(() => import('../pages/admin/AddProduct'));

const publicRoutes = [
  { path: '/', element: <Home />, showNavbar: true },
  { path: '/about', element: <About />, showNavbar: true },
  { path: '/contact', element: <Contact />, showNavbar: true },
  { path: '/login', element: <AuthPanel />, showNavbar: true },
  { path: '/register', element: <AuthPanel />, showNavbar: true },
  { path: '/perfil', element: <PerfilUsuario />, showNavbar: true },
  { path: '/ProductosUser', element: <ProductosUser />, showNavbar: true },
  { path: '/Carrito', element: <Carrito />, showNavbar: true }, // 
];

const adminRoutes = [
  { path: '/Admin/HomeAdmin', element: <HomeAdmin />, isAdmin: true },
  { path: '/Admin/AddProduct', element: <AddProduct />, isAdmin: true },
];

const notFoundRoute = {
  path: '*',
  element: <div className="">404 - Página no encontrada u.u</div>,
  showNavbar: false,
};

export const appRoutes = [...publicRoutes, ...adminRoutes, notFoundRoute];
