// services/productoService.js
import axios from 'axios';

const BASE_URL = 'https://backend-zapa.onrender.com/api/productos';

class ProductoService {
    // obtener todos los productos
    getAllProductos() {
        return axios.get(BASE_URL);
    }

    // obtener producto por id
    getProductoById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    // crear producto
    createProducto(producto) {
        return axios.post(BASE_URL, producto);
    }

    // actualizar producto completo
    updateProducto(id, producto) {
        return axios.put(`${BASE_URL}/${id}`, producto);
    }

    // eliminar producto
    deleteProducto(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    // métodos personalizados
    buscarPorMarca(nombreMarca) {
        return axios.get(`${BASE_URL}/marca/${nombreMarca}`);
    }

    buscarPorRangoPrecio(min, max) {
        return axios.get(`${BASE_URL}/precio?min=${min}&max=${max}`);
    }

    buscarPorCategoria(categoria) {
        return axios.get(`${BASE_URL}/categoria/${categoria}`);
    }

    buscarPorGenero(genero) {
        return axios.get(`${BASE_URL}/genero/${genero}`);
    }

    buscarConDescuento(descuento) {
        return axios.get(`${BASE_URL}/descuento/${descuento}`);
    }

    // nuevo método para descontar stock
    descontarStock(id, cantidad) {
        return axios.patch(`${BASE_URL}/${id}/stock?cantidad=${cantidad}`);
    }
}

export default new ProductoService();
