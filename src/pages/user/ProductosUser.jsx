import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';
import TextAtom from '../../components/atoms/TextAtom';
import '../../style/pages/Home.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = () => {
    ProductoService.getAllProductos()
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.log('Error fetching productos:', error);
      });
  };

  const calcularPrecioConDescuento = (precio, descuento) => {
    return (precio * (1 - descuento / 100)).toFixed(2);
  };

  return (
    <main className='home'>
      <div className="productos-grid">
        {productos.map(producto => (
          <div key={producto.idProducto} className="producto-card">
            <div className="producto-imagen-container">
              <img src={producto.imgPrincipal} alt={producto.nombre} className="producto-imagen" />
            </div>
            <div className="producto-info">
              <TextAtom variant="h3" className="producto-nombre">{producto.nombre}</TextAtom>
              <TextAtom variant="p" className="producto-descripcion">{producto.descripcion}</TextAtom>

              <div className="producto-precio-container">
                {producto.descuento > 0 ? (
                  <>
                    <TextAtom variant="span" className="producto-precio-descuento">
                      ${calcularPrecioConDescuento(producto.precio, producto.descuento)}
                    </TextAtom>
                    <TextAtom variant="span" className="producto-precio-original">${producto.precio}</TextAtom>
                    <TextAtom variant="span" className="producto-descuento-tag">-{producto.descuento}%</TextAtom>
                  </>
                ) : (
                  <TextAtom variant="span" className="producto-precio-normal">${producto.precio}</TextAtom>
                )}
              </div>

              <div className="producto-caracteristicas">
                {producto.marca && (
                  <div className="caracteristica-item">
                    <TextAtom variant="span" className="caracteristica-label">Marca:</TextAtom>
                    <TextAtom variant="span" className="caracteristica-valor">{producto.marca.nombre}</TextAtom>
                  </div>
                )}
                {producto.genero && (
                  <div className="caracteristica-item">
                    <TextAtom variant="span" className="caracteristica-label">Género:</TextAtom>
                    <TextAtom variant="span" className="caracteristica-valor">{producto.genero.nombre}</TextAtom>
                  </div>
                )}
                <div className="caracteristica-item">
                  <TextAtom variant="span" className="caracteristica-label">Stock:</TextAtom>
                  <TextAtom 
                    variant="span" 
                    className={`caracteristica-valor ${producto.stock > 0 ? 'stock-disponible' : 'stock-agotado'}`}
                  >
                    {producto.stock > 0 ? `${producto.stock} disponibles` : 'Agotado'}
                  </TextAtom>
                </div>
                {producto.ecofriendly && (
                  <div className="caracteristica-item">
                    <TextAtom variant="span" className="caracteristica-label">Eco:</TextAtom>
                    <TextAtom variant="span" className="caracteristica-valor eco-friendly">Friendly</TextAtom>
                  </div>
                )}
              </div>

              <div className="producto-botones">
                <button 
                  className={`btn-agregar-carrito ${producto.stock > 0 ? 'btn-disponible' : 'btn-agotado'}`}
                  disabled={producto.stock === 0}
                >
                  <TextAtom variant="span">
                    {producto.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
                  </TextAtom>
                </button>
              </div>
            </div>
          </div>
        ))}

        {productos.length === 0 && (
          <div className="no-productos">
            <TextAtom variant="h3" className="no-productos-title">No hay productos disponibles</TextAtom>
            <TextAtom variant="p" className="no-productos-text">Pronto agregaremos nuevos productos a nuestra tienda.</TextAtom>
          </div>
        )}

        <div className="productos-contador">
          <TextAtom variant="p" className="contador-text">
            Mostrando {productos.length} producto{productos.length !== 1 ? 's' : ''}
          </TextAtom>
        </div>
      </div>
    </main>
  );
};

export default Productos;
