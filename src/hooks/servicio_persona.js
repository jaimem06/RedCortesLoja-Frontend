import Cookies from 'js-cookie';
import { GET, POST,DELETE} from './connection';

// servicio para listar personas
export async function listar_usuarios() {
    let datos = null;
    try {
        console.log("Obteniendo usuarios", datos);
        const token = Cookies.get('token');
        datos = await GET("usuario/obtener", token);
    } catch (error) {
        console.log("PIU PIU PIU",error.message);
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


// servicio para obtener una persona por external_id
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
export async function modificar_persona(data, external_id) {
    let datos = null;
    try {
        const token = Cookies.get('token');
        const ext = Cookies.get('external_id');
        datos = await POST("usuario/actualizar/" + external_id, data, token);
        if (ext === external_id) {
            Cookies.set('external_id', datos.data.external_id);   
        }
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos.data;
}

// servicio para dar de baja una persona (cambiar estado de cuenta)
export async function modificar_estado(external_id) {
    console.log("external_id:", external_id);
    let datos = null;
    try {
        const token = Cookies.get('token');
        console.log("token:", token);
        datos = await GET(`/usuario/actualizar_estado/${external_id}`, token);
        console.log("datos:", datos);
    } catch (error) {
        console.log("Error:", error.message);
        return { "code": 500 };
    }
    return datos ? datos.data : { "code": 500 };
}



// servicio para modificar credenciales de una persona
export async function modificar_credenciales(data, external_id) {
    let datos = null;
    try {
        const token = Cookies.get('token');
        datos = await POST("persona/modificar-credenciales/" + external_id, data, token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos.data;
}