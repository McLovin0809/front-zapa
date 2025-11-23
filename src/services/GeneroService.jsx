import axios from "axios";

const BASE_URL = "https://backend-zapa.onrender.com/api/generos";

class GeneroService {
  getAllGeneros() {
    return axios.get(BASE_URL);
  }
  getGeneroById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }
  createGenero(genero) {
    return axios.post(BASE_URL, genero);
  }
  updateGenero(id, genero) {
    return axios.put(`${BASE_URL}/${id}`, genero);
  }
  deleteGenero(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
  buscarPorNombre(nombre) {
    return axios.get(`${BASE_URL}/buscar/${nombre}`);
  }
  existeGenero(nombre) {
    return axios.get(`${BASE_URL}/existe/${nombre}`);
  }
}

export default new GeneroService();
