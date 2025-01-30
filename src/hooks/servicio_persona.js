import Cookies from 'js-cookie';
import { GET, POST } from './connection';

// servicio para listar personas
export async function listar_usuarios() {
    let datos = null;
    try {
        const token = Cookies.get('token');
        datos = await GET("usuario/obtener", token);
    } catch (error) {
        console.log(error.message);
        return { "code": 500 };
    }
    return datos;
}

//servicio para guardar personas
export async function guardar_persona(data) {
    let datos = null;
    try {
        const token = Cookies.get('token');
        
        datos = await POST("usuario/crear", data, token);    
    } catch (error) {
        console.log(error.response.data);
        return { code: 500, message: "Error interno del servidor" };
    }
    return datos.data;
}


// servicio para obtener una persona por external
export async function obtener_persona(external_id) {
    let datos = null;
    console.log("Obteniendo persona con external_id:", external_id);
    try {
        const token = Cookies.get('token');
        datos = await GET("usuario/obtener/" + external_id, token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    console.log("Datos obtenidos aa:", datos);
    return datos;
}

// servicio para eliminar una persona
export async function eliminar_usuario(external_id) {
    let datos = null;
    try {
        const token = Cookies.get('token');
        // Hacemos una solicitud DELETE al backend para eliminar al usuario
        datos = await DELETE("usuario/eliminar/" + external_id, token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos.data;
}


// servicio para modificar una persona
export async function modificar_persona(data, external) {
    let datos = null;
    try {
        const token = Cookies.get('token');
        const ext = Cookies.get('external');
        datos = await POST("usuario/actualizar/" + external, data, token);
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
export async function modificar_estado(external_id) {
    let datos = null;
    try {
        const token = Cookies.get('token');
        const data = {}; // Si no necesitas datos adicionales, el cuerpo puede estar vacío o agregar lo que necesites

        // Enviar la solicitud POST con el external_id como parámetro
        datos = await POST(`/usuario/actualizar_estado/${external_id}`, data, token);
    } catch (error) {
        console.log(error.message);
        return { "code": 500 };
    }
    return datos;
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