import axios from "axios";

const API_URL = "http://localhost:8080/api/categorias";

class CategoriaService {
  getCategorias() {
    return axios.get(API_URL);
  }

  getCategoriaById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createCategoria(categoria) {
    return axios.post(API_URL, categoria);
  }

  updateCategoria(id, categoria) {
    return axios.put(`${API_URL}/${id}`, categoria);
  }

  patchCategoria(id, datos) {
    return axios.patch(`${API_URL}/${id}`, datos);
  }

  deleteCategoria(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  buscarCategoriaPorNombre(nombre) {
    return axios.get(`${API_URL}/buscar/${nombre}`);
  }

  existeCategoria(nombre) {
    return axios.get(`${API_URL}/existe/${nombre}`);
  }
}

export default new CategoriaService();   // 👈 ahora sí existe
