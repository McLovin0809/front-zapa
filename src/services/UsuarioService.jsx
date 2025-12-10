import axios from 'axios';

const BASE_URL = "https://backend-zapa.onrender.com/api/usuarios";

// ✅ FUNCIÓN QUE AGREGA EL TOKEN A TODAS LAS PETICIONES PROTEGIDAS
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`
  };
};

class UsuarioService {

  // ✅ Obtener todos los usuarios (PROTEGIDO)
  getAllUsuarios() {
    return axios.get(BASE_URL, { headers: authHeader() });
  }

  // ✅ Obtener usuario por ID (PROTEGIDO)
  getUsuarioById(id) {
    return axios.get(`${BASE_URL}/${id}`, { headers: authHeader() });
  }

  // ✅ Crear usuario (PROTEGIDO)
  createUsuario(usuario) {
    return axios.post(BASE_URL, usuario, { headers: authHeader() });
  }

  // ✅ Actualizar usuario completo (PROTEGIDO)
  updateUsuario(id, usuario) {
    return axios.put(`${BASE_URL}/${id}`, usuario, { headers: authHeader() });
  }

  // ✅ Actualizar usuario parcial (PROTEGIDO)
  updateUsuarioParcial(id, datos) {
    return axios.patch(`${BASE_URL}/${id}`, datos, { headers: authHeader() });
  }

  // ✅ Eliminar usuario (PROTEGIDO)
  deleteUsuario(id) {
    return axios.delete(`${BASE_URL}/${id}`, { headers: authHeader() });
  }

  // ✅ Buscar usuario por email (PROTEGIDO)
  buscarPorEmail(email) {
    return axios.get(`${BASE_URL}/buscar/${email}`, { headers: authHeader() });
  }

  // ✅ Buscar usuarios por rol (PROTEGIDO)
  buscarPorRol(rol) {
    return axios.get(`${BASE_URL}/rol/${rol}`, { headers: authHeader() });
  }

  // ⚠️ Este NO debe llevar token
  healthCheck() {
    return axios.get(`${BASE_URL}/health`);
  }

  // ✅ LOGIN → ESTE NO LLEVA TOKEN
  login({ email, clave }) {
    return axios.post(`${BASE_URL}/login`, { email, clave });
  }
}

export default new UsuarioService();
