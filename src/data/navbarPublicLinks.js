export const PublicLinks = (user, totalItems) => {
  const links = [
    { label: "Inicio", to: "/" },
    { label: "Productos", to: "/productos" },
    { label: "Sobre Nosotros", to: "/about" },
    { label: user?.email ? "Perfil" : "Iniciar sesión", to: user?.email ? "/perfil" : "/login" },
    { label: `🛒 Carrito (${totalItems})`, to: "/carrito" },
  ];

  if (user?.email) {
    links.push({ label: "Salir", to: "/logout" });
  }

  return links;
};

// Exportación correcta
export default PublicLinks;
