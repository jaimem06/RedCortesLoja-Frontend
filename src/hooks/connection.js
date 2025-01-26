const URL = 'http://127.0.0.1:5000/';
import axios from 'axios';

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