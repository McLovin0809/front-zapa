// services/productoService.js
import axios from 'axios';

const BASE_URL = '';

class ProductoService {
    getAllProductos() {
        return axios.get(BASE_URL);
    }

    getProductoById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    createProducto(producto) {
        return axios.post(BASE_URL, producto);
    }

    updateProducto(id, producto) {
        return axios.put(`${BASE_URL}/${id}`, producto);
    }

    deleteProducto(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    //metodos personalizados
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
}

export default new ProductoService();