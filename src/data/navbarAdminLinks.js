export const adminLinks = [
  { to: "/Admin/HomeAdmin", label: "Panel Admin" },
  { to: "/admin/AddProduct", label: "Subir Producto" },
  { to: "/", label: "Salir", onClick: () => handleLogout() }, // opcional
];

export default adminLinks;