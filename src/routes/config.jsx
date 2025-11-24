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
  { path: '/productos', element: <ProductosUser />, showNavbar: true },
  { path: '/about', element: <About />, showNavbar: true },
  { path: '/contact', element: <Contact />, showNavbar: true },
  { path: '/login', element: <AuthPanel />, showNavbar: false },
  { path: '/register', element: <AuthPanel />, showNavbar: false },
  { path: '/perfil', element: <PerfilUsuario />, showNavbar: true },
];

const adminRoutes = [
  { path: '/admin/home', element: <HomeAdmin />, isAdmin: true },
  { path: '/admin/add-product', element: <AddProduct />, isAdmin: true },
  { path: '/perfil', element: <PerfilUsuario />, showNavbar: true }, // admin también puede acceder al perfil
  { path: '/productos', element: <ProductosUser />, showNavbar: true }, // admin puede ver productos también
];

const notFoundRoute = {
  path: '*',
  element: <div className="text-center py-10 text-2xl">404 - Página no encontrada u.u</div>,
  showNavbar: false,
};

export const appRoutes = [...publicRoutes, ...adminRoutes, notFoundRoute];
