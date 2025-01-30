const URL = 'http://localhost:5000/';
//const URL = 'https://serviciodeusuariosyubicaciones-ejc7emcfe4atbvde.canadacentral-01.azurewebsites.net/';
const URLU = 'https://servicio-dpdubkhed9bac2dk.eastus-01.azurewebsites.net/';
//URLU para micrservicio de supervisor y notifiaciones

import axios from 'axios';

// Metodo POST para supervisor y notificaiones
export const POSTU = async (resource, data, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    if (token !== "NONE") {
        headers.headers["Authorization"] = `Bearer ${token}`;
    }
    return await axios.post(URLU + resource, data, headers);
}


// Metodo GET para supervisor y notificaiones
export const GETU = async (resource, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
        }
    }
    if (token !== "NONE") {
        headers.headers["Authorization"] = `Bearer ${token}`;
    }
    return await axios.get(URLU + resource, headers);
}
// Metodo POST
export const POST = async (resource, data, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    if (token !== "NONE") {
        headers.headers["Authorization"] = `Bearer ${token}`;
    }
    return await axios.post(URL + resource, data, headers);
}

// Metodo GET
export const GET = async (resource, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
        }
    }
    if (token !== "NONE") {
        headers.headers["Authorization"] = `Bearer ${token}`;
    }
    return await axios.get(URL + resource, headers);
}

// Metodo DELETE
export const DELETE = async (resource, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
        }
    }
    if (token !== "NONE") {
        headers.headers["Authorization"] = `Bearer ${token}`;
    }
    return await axios.delete(URL + resource, headers);
}
