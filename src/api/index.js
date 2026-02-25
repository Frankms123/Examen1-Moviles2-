/**
 * @module API
 * @description Configuración centralizada de Axios para la conexión con Fake Store API.
 * Proporciona una instancia preconfigurada con la URL base y headers necesarios.
 */
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
