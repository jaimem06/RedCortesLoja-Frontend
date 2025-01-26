import Cookies from 'js-cookie';
import { GET,POST } from './connection';

export async function motas() {
    try {
        const token = Cookies.get('token');
        console.log('Token:', token);
        const response = await GET('mota', token); 
        console.log('Data recibida del backend:', response);
        if (response.data && response.data.code === 200) {
            return response.data.datos; 
        } else {
            console.error('Error en la respuesta del servidor:', response);
            return { "code": response.data.code || 500 }; 
        }
    } catch (error) {
        console.error('Error al realizar la petición:', error);
        return { "code": 500 }; 
    }
}

export async function buscar_mota(token,params){
    let datos = null;
    try {
    
       datos = await GET('mota/'+params.external,token);
    } catch (error) {
       console.log(error.response.data);
       return{"code": 500}
    }
    return datos.data;
}

export async function save_mota(data, token) {
    let datos = null;
    console.log(data);
    try {
      datos = await POST('mota/guardar', data, token);
      console.log(datos);
    } catch (error) {
      console.log(error.response.data);
      return { "code": 500, "datos": error.response.data };
    }
    return datos.data;
  }

 export async function modify_mota(data,params, token) {
    console.log(data);
    try {
        return await POST('mota/modificar/'+params.external, data, token);
        
    } catch (error) {
        console.error(error);
        return null;
    }
 } 
 
export async function get_tipos(token){
    let datos = null;
    try {
       datos = await GET('listarTipos',token);
    } catch (error) {
       console.log(error.response.data);
       return[];
    }
    return datos.data || [] ;
}