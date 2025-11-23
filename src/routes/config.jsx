import { lazy } from 'react';

// Lazy loading
const Home = lazy(() => import('../pages/user/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const CreateUser = lazy(() => import('../pages/auth/CreateUser'));
const HomeAdmin = lazy(() => import('../pages/admin/HomeAdmin'));
const HomeProducto = lazy(() => import('../pages/admin/Productos/HomeProductos')); 

// Rutas públicas
const publicRoutes = [
  { path: '/', element: <Home />, showNavbar: true },
  { path: '/login', element: <Login />, showNavbar: false },
  { path: '/CreateUser', element: <CreateUser />, showNavbar: false },
];

// Rutas admin
const adminRoutes = [
  { path: '/admin/dashboard', element: <HomeAdmin />, isAdmin: true },
  { path: '/admin/productos', element: <HomeProducto />, isAdmin: true }, 
];

// Ruta 404
const notFoundRoute = {
  path: '*',
  element: <div className="text-center py-10 text-2xl">404 - Página no encontrada u.u</div>,
  showNavbar: false,
};

export const appRoutes = [...publicRoutes, ...adminRoutes, notFoundRoute];