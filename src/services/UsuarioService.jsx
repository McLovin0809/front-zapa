import axios from "axios";

const BASE_URL = "https://backend-zapa.onrender.com/api/usuarios";

class UsuarioService {
    getAllUsuarios() {
        return axios.get(BASE_URL)
    }

    getUsuarioById(){
        return axios.get(`${BASE_URL}/${id}`)
    }

    createUsuario(usuario) {
        return axios.post(`${BASE_URL}/register`, usuario)
    }

    loginUsuario(credenciales) {
        return axios.post(`${BASE_URL}/login`, credenciales);
    }

    updateUsuario(id, usuario) {
        return axios.put(`${BASE_URL}/${id}`, usuario);
    }

    updateUsuarioParcial(id, datos) {
        return axios.patch(`${BASE_URL}/${id}`, datos);
    }

    deleteUsuario(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    buscarPorEmail(email) {
        return axios.get(`${BASE_URL}/buscar/email/${email}`);
    }

    buscarPorRol(rol) {
        return axios.get(`${BASE_URL}/buscar/rol/${rol}`);
    }
}

export default new UsuarioService();