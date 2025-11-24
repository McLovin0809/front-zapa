// src/services/generoService.js
import axios from 'axios';

const BASE_URL = 'https://backend-zapa.onrender.com/api/generos';

class GeneroService {
  // Obtener todos los géneros
  getAllGeneros() {
    return axios.get(BASE_URL);
  }

  // Obtener género por ID
  getGeneroById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  // Crear nuevo género
  createGenero(genero) {
    return axios.post(BASE_URL, genero);
  }

  // Actualizar género completo (PUT)
  updateGenero(id, genero) {
    return axios.put(`${BASE_URL}/${id}`, genero);
  }

  // Actualizar género parcial (PATCH)
  patchGenero(id, datos) {
    return axios.patch(`${BASE_URL}/${id}`, datos);
  }

  // Eliminar género
  deleteGenero(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
}

export default new GeneroService();
