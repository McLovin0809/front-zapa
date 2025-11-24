import axios from 'axios';

const BASE_URL = "https://backend-zapa.onrender.com/api/ventas";

class VentaService {
    // Obtener todas las ventas
    getAllVentas() {
        return axios.get(BASE_URL);
    }

    // Obtener venta por ID
    getVentaById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    // Crear nueva venta
    createVenta(venta) {
        return axios.post(BASE_URL, venta);
    }

    // Actualizar venta completa
    updateVenta(id, venta) {
        return axios.put(`${BASE_URL}/${id}`, venta);
    }

    // Actualizar venta parcial
    updateVentaParcial(id, datos) {
        return axios.patch(`${BASE_URL}/${id}`, datos);
    }

    // Eliminar venta
    deleteVenta(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    // Buscar ventas por usuario
    buscarPorUsuario(idUsuario) {
        return axios.get(`${BASE_URL}/usuario/${idUsuario}`);
    }

    // Buscar ventas por estado
    buscarPorEstado(nombreEstado) {
        return axios.get(`${BASE_URL}/estado/${nombreEstado}`);
    }

    // Buscar ventas por rango de fechas
    buscarPorFechas(desde, hasta) {
        return axios.get(`${BASE_URL}/fecha`, {
            params: {
                desde,
                hasta
            }
        });
    }
}

export default new VentaService();
