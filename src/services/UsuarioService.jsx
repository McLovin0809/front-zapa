// src/services/UsuarioService.js
import axios from "axios";

const BASE_URL = "https://backend-zapa.onrender.com/api/usuarios";

class UsuarioService {
  getAllUsuarios() {
    return axios.get(BASE_URL);
  }
  getUsuarioById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }
  createUsuario(usuario) {
    return axios.post(BASE_URL, usuario);
  }
  updateUsuario(id, usuario) {
    return axios.put(`${BASE_URL}/${id}`, usuario);
  }
  deleteUsuario(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
  buscarPorEmail(email) {
    return axios.get(`${BASE_URL}/buscar/${email}`);
  }
  buscarPorRol(rol) {
    return axios.get(`${BASE_URL}/rol/${rol}`);
  }
  healthCheck() {
    return axios.get(`${BASE_URL}/health`);
  }
  login({ email, clave }) {
    return axios.post(`${BASE_URL}/login`, { email, clave });
  }
}

export default new UsuarioService();
