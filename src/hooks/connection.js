const URL = 'http://127.0.0.1:5000/';
const URLU = 'https://servicio-dpdubkhed9bac2dk.eastus-01.azurewebsites.net/';
//const URLU = 'https://serviciodeusuariosyubicaciones-ejc7emcfe4atbvde.canadacentral-01.azurewebsites.net/';

// URL para microservicio de supervisor y notificaciones
// URLU para microservicio de usuarios y ubicación
import axios from 'axios';

// Método POST para supervisor y notificaciones
export const POSTU = async (resource, data, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    if (token !== "NONE") {
        headers.headers["Authorization"] = `Bearer ${token}`;
    }
    return await axios.post(URLU + resource, data, headers);
};

// Método GET para supervisor y notificaciones
export const GETU = async (resource, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json"
        }
    };
    if (token !== "NONE") {
        headers.headers["Authorization"] = `Bearer ${token}`;
    }
    return await axios.get(URLU + resource, headers);
};

// Método POST para usuario y ubicación
export const POST = async (resource, data, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    if (token !== "NONE") {
        headers.headers["Authorization"] = `Bearer ${token}`;
    }
    return await axios.post(URL + resource, data, headers);
};

// Método GET para usuario y ubicación
export const GET = async (resource, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json"
        }
    };
    if (token !== "NONE") {
        headers.headers["Authorization"] = `Bearer ${token}`;
    }
    return await axios.get(URL + resource, headers);
};
