export const getProductsData = (productos, calcularPrecioConDescuento) => {
    const productosCards = productos.map(producto => ({
        card: [
            {
                type: "image",
                src: producto.imgPrincipal,
                alt: producto.nombre,
                className: "producto-imagen"
            },
            {
                type: "text",
                content: producto.nombre,
                variant: "h3",
                className: "producto-nombre"
            },
            {
                type: "text",
                content: producto.descripcion,
                variant: "p", 
                className: "producto-descripcion"
            },
            {
                type: "text",
                content: `$${producto.descuento > 0 ? 
                    calcularPrecioConDescuento(producto.precio, producto.descuento) : 
                    producto.precio
                }`,
                variant: "span",
                className: producto.descuento > 0 ? "producto-precio-descuento" : "producto-precio-normal"
            }
        ],
        className: "producto-card admin-product-card"
    }));

    return [
        {
            type: "text",
            text: [
                {
                    content: "Gestión de Productos",
                    variant: "h2",
                    className: "section-title"
                }
            ],
            className: "section-header"
        },
        {
            type: "cards",
            cards: productosCards,
            className: "productos-grid"
        }
    ];
};

export default getProductsData;