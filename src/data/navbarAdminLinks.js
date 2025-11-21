export const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Usuarios" },
  { to: "/admin/facciones", label: "Productos" },
  { to: "/", label: "Salir", onClick: () => handleLogout() }, // opcional
];

export default adminLinks;