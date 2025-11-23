export const getTabsData = (productos, usuarios) => [
    {
        label: "📦 Productos",
        count: productos.length,
        value: "productos"
    },
    {
        label: "👥 Usuarios", 
        count: usuarios.length,
        value: "usuarios"
    }
];

// Exportación por defecto también por si acaso
export default getTabsData;