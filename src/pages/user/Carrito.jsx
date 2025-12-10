import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import VentaService from "../../services/VentaService";
import ProductoService from "../../services/ProductoService"; // 👈 usamos ProductoService
import axios from "axios";
import "../../style/pages/Carrito.css";

const Carrito = () => {
  const {
    carrito,
    quitarProducto,
    vaciarCarrito,
    incrementarCantidad,
    disminuirCantidad
  } = useContext(CartContext);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  const total = carrito.reduce(
    (acc, p) => acc + Number(p.precio) * Number(p.cantidad),
    0
  );

  const realizarCompra = async () => {
    if (!usuario || !usuario.idUsuario) {
      alert("Debes iniciar sesión para comprar");
      navigate("/login");
      return;
    }

    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    try {
      // Crear la venta usando VentaService
      const venta = {
        usuario: { idUsuario: usuario.idUsuario },
        fechaVenta: new Date().toISOString(),
        total,
        estado: { idEstado: 1 },
        metodoPago: { idMetodoPago: 1 }
      };

      const ventaRes = await VentaService.createVenta(venta);
      const idVenta = ventaRes.data.idVenta;

      // Registrar detalles y descontar stock
      for (const item of carrito) {
        const detalle = {
          venta: { idVenta },
          producto: { idProducto: item.idProducto },
          cantidad: item.cantidad,
          subtotal: item.precio * item.cantidad
        };

        // Guardar detalle de venta
        await axios.post(
          "https://backend-zapa.onrender.com/api/productos-venta",
          detalle
        );

        // Descontar stock del producto
        try {
          const resStock = await ProductoService.descontarStock(item.idProducto, item.cantidad);
          console.log(`Stock actualizado para ${item.nombre}:`, resStock.data.stock);
        } catch (err) {
          console.error(`Error al descontar stock de ${item.nombre}:`, err.response?.data || err.message);
          alert(`No hay suficiente stock para "${item.nombre}". Compra detenida.`);
          return;
        }
      }

      alert("Compra realizada con éxito");
      vaciarCarrito();
      navigate("/perfil");
    } catch (error) {
      console.error("Error al comprar:", error.response?.data || error.message);
      alert(`Error al procesar la compra: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="carrito-page">
      <h2 className="carrito-titulo">🛒 Tu carrito</h2>

      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <p>Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <ul className="carrito-lista">
            {carrito.map((p) => (
              <li key={p.idProducto} className="carrito-item">
                <div className="carrito-info">
                  <span className="carrito-nombre">{p.nombre}</span>
                  <span className="carrito-precio">
                    {p.cantidad} x ${Number(p.precio).toFixed(2)} = $
                    {(Number(p.precio) * Number(p.cantidad)).toFixed(2)}
                  </span>
                </div>

                <div className="carrito-controles">
                  <button
                    onClick={() => disminuirCantidad(p.idProducto)}
                    className="carrito-cantidad-btn"
                  >
                    −
                  </button>
                  <span className="carrito-cantidad">{p.cantidad}</span>
                  <button
                    onClick={() => incrementarCantidad(p.idProducto)}
                    className="carrito-cantidad-btn"
                  >
                    +
                  </button>
                  <button
                    onClick={() => quitarProducto(p.idProducto)}
                    className="carrito-quitar"
                  >
                    Borrar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="carrito-total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>

          <div className="carrito-botones">
            <button onClick={realizarCompra} className="carrito-btn comprar">
              Comprar
            </button>
            <button onClick={vaciarCarrito} className="carrito-btn vaciar">
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
