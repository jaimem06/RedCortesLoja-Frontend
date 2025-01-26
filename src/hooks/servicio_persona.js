import Cookies from 'js-cookie';
import { GET, POST } from '../hooks/connection';

// servicio para listar personas
export async function listar_personas() {
    let datos = null;
    try {
        const token = Cookies.get('token');
        datos = await GET("persona", token);
    } catch (error) {
        console.log(error.message);
        return { "code": 500 };
    }
    return datos.data;
}

// servicio para guardar personas
export async function guardar_persona(data) {
    let datos = null;
    try {
        const token = Cookies.get('token');
        datos = await POST("persona/guardar", data, token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos.data;
}

// servicio para obtener una persona por external
export async function obtener_persona(external_id) {
    let datos = null;
    try {
        const token = Cookies.get('token');
        datos = await GET("usuario/obtener/" + external_id, token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos;
}

// servicio para modificar una persona
export async function modificar_persona(data, external) {
    let datos = null;
    try {
        const token = Cookies.get('token');
        const ext = Cookies.get('external');
        datos = await POST("persona/modificar/" + external, data, token);
        if (ext === external) {
            Cookies.set('external', datos.data.external);
        }
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos.data;
}

// servicio para dar de baja una persona (cambiar estado de cuenta)
export async function modificar_estado(external) {
    let datos = null;
    try {
        const token = Cookies.get('token');
        datos = await GET("persona/actualizar-estado/" + external, token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos.data;
}

// servicio para modificar credenciales de una persona
export async function modificar_credenciales(data, external) {
    let datos = null;
    try {
        const token = Cookies.get('token');
        datos = await POST("persona/modificar-credenciales/" + external, data, token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos.data;
}