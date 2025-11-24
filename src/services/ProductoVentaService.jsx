import axios from 'axios';

const BASE_URL = "https://backend-zapa.onrender.com/api/productos-venta";

class ProductosVentaService {
    // Obtener todos los productos-venta
    getAllProductosVenta() {
        return axios.get(BASE_URL);
    }

    // Obtener producto-venta por ID
    getProductosVentaById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    // Crear producto-venta
    createProductosVenta(productosVenta) {
        return axios.post(BASE_URL, productosVenta);
    }

    // Actualizar producto-venta completo
    updateProductosVenta(id, productosVenta) {
        return axios.put(`${BASE_URL}/${id}`, productosVenta);
    }

    // Actualizar producto-venta parcial
    updateProductosVentaParcial(id, datos) {
        return axios.patch(`${BASE_URL}/${id}`, datos);
    }

    // Eliminar producto-venta
    deleteProductosVenta(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    // Buscar productos por venta
    buscarPorVenta(idVenta) {
        return axios.get(`${BASE_URL}/venta/${idVenta}`);
    }

    // Buscar ventas por producto
    buscarPorProducto(idProducto) {
        return axios.get(`${BASE_URL}/producto/${idProducto}`);
    }
}

export default new ProductosVentaService();
