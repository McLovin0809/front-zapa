import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((p) => p.idProducto === producto.idProducto);
      if (existente) {
        return prev.map((p) =>
          p.idProducto === producto.idProducto
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarProducto = (idProducto) => {
    setCarrito((prev) => prev.filter((p) => p.idProducto !== idProducto));
  };

  const incrementarCantidad = (idProducto) => {
    setCarrito((prev) =>
      prev.map((p) =>
        p.idProducto === idProducto
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      )
    );
  };

  const disminuirCantidad = (idProducto) => {
    setCarrito((prev) =>
      prev
        .map((p) =>
          p.idProducto === idProducto
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        quitarProducto,
        vaciarCarrito,
        incrementarCantidad,
        disminuirCantidad
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
