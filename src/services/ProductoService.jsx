// services/productoService.js
import axios from 'axios';

const BASE_URL = 'https://backend-zapa.onrender.com/api/productos';

// AGREGA TOKEN JWT A TODAS LAS PETICIONES
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`
  };
};

class ProductoService {

  getAllProductos() {
    return axios.get(BASE_URL, { headers: authHeader() });
  }

  getProductoById(id) {
    return axios.get(`${BASE_URL}/${id}`, { headers: authHeader() });
  }

  createProducto(producto) {
    return axios.post(BASE_URL, producto, { headers: authHeader() });
  }

  updateProducto(id, producto) {
    return axios.put(`${BASE_URL}/${id}`, producto, { headers: authHeader() });
  }

  deleteProducto(id) {
    return axios.delete(`${BASE_URL}/${id}`, { headers: authHeader() });
  }

  buscarPorMarca(nombreMarca) {
    return axios.get(`${BASE_URL}/marca/${nombreMarca}`, { headers: authHeader() });
  }

  buscarPorRangoPrecio(min, max) {
    return axios.get(`${BASE_URL}/precio?min=${min}&max=${max}`, { headers: authHeader() });
  }

  buscarPorCategoria(categoria) {
    return axios.get(`${BASE_URL}/categoria/${categoria}`, { headers: authHeader() });
  }

  buscarPorGenero(genero) {
    return axios.get(`${BASE_URL}/genero/${genero}`, { headers: authHeader() });
  }

  buscarConDescuento(descuento) {
    return axios.get(`${BASE_URL}/descuento/${descuento}`, { headers: authHeader() });
  }
}

export default new ProductoService();