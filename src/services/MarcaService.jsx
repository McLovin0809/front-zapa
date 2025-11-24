import axios from 'axios';

const BASE_URL = 'https://backend-zapa.onrender.com/api/marcas';

class MarcaService {
  // Obtener todas las marcas
  getAllMarcas() {
    return axios.get(BASE_URL);
  }

  // Obtener marca por ID
  getMarcaById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  // Crear nueva marca
  createMarca(marca) {
    return axios.post(BASE_URL, marca);
  }

  // Actualizar marca completa (PUT)
  updateMarca(id, marca) {
    return axios.put(`${BASE_URL}/${id}`, marca);
  }

  // Actualizar marca parcial (PATCH)
  patchMarca(id, datos) {
    return axios.patch(`${BASE_URL}/${id}`, datos);
  }

  // Eliminar marca
  deleteMarca(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }

  // Métodos personalizados
  buscarPorNombreExacto(nombre) {
    return axios.get(`${BASE_URL}/buscar/exacto/${nombre}`);
  }

  buscarPorNombreParcial(nombre) {
    return axios.get(`${BASE_URL}/buscar/parcial/${nombre}`);
  }

  existeMarca(nombre) {
    return axios.get(`${BASE_URL}/existe/${nombre}`);
  }
}

export default new MarcaService();
