// src/services/UsuarioService.js
import axios from 'axios';

const BASE_URL = "https://backend-zapa.onrender.com/api/usuarios";

class UsuarioService {
    // Obtener todos los usuarios
    getAllUsuarios() {
        return axios.get(BASE_URL);
    }

    // Obtener usuario por ID
    getUsuarioById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    // Crear usuario
    createUsuario(usuario) {
        return axios.post(BASE_URL, usuario);
    }

    // Actualizar usuario completo
    updateUsuario(id, usuario) {
        return axios.put(`${BASE_URL}/${id}`, usuario);
    }

    // Actualizar usuario parcial
    updateUsuarioParcial(id, datos) {
        return axios.patch(`${BASE_URL}/${id}`, datos);
    }

    // Eliminar usuario
    deleteUsuario(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    // Buscar usuario por email
    buscarPorEmail(email) {
        return axios.get(`${BASE_URL}/buscar/${email}`);
    }

    // Buscar usuarios por rol
    buscarPorRol(rol) {
        return axios.get(`${BASE_URL}/rol/${rol}`);
    }

    // Endpoint de salud (opcional)
    healthCheck() {
        return axios.get(`${BASE_URL}/health`);
    }

    // Login de usuario
    login({ email, clave }) {
        return axios.post(`${BASE_URL}/login`, { email, clave });
    }
}

export default new UsuarioService();
