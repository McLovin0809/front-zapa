// services/categoriaService.js
import axios from 'axios';

const BASE_URL = 'https://backend-zapa.onrender.com/api/categorias';

class CategoriaService {
    // Obtener todas las categorías
    getAllCategorias() {
        return axios.get(BASE_URL);
    }

    // Obtener categoría por ID
    getCategoriaById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    // Crear nueva categoría
    createCategoria(categoria) {
        return axios.post(BASE_URL, categoria);
    }

    // Actualizar categoría completa (PUT)
    updateCategoria(id, categoria) {
        return axios.put(`${BASE_URL}/${id}`, categoria);
    }

    // Actualizar categoría parcial (PATCH)
    patchCategoria(id, datos) {
        return axios.patch(`${BASE_URL}/${id}`, datos);
    }

    // Eliminar categoría
    deleteCategoria(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    // Métodos personalizados
    buscarPorNombre(nombre) {
        return axios.get(`${BASE_URL}/buscar/${nombre}`);
    }

    existeCategoria(nombre) {
        return axios.get(`${BASE_URL}/existe/${nombre}`);
    }
}

export default new CategoriaService();
