import { GET } from './connection';
import Cookies from 'js-cookie';

export const obtenerProyeccionMonitoreo = async (token, steps = 20) => {
    try {
        const response = await GET(`monitoreo/proyeccion?steps=${steps}`);
        return response.data; 
    } catch (error) {
        console.log('Error al obtener proyección:', error);
        throw error; 
    }
};

export async function all_monitoreo() {
  let datos = null;
  try {
    const token = Cookies.get('token');
    datos = await GET('monitoreo', token);
  } catch (error) {
    console.log(error.response.data);
    return { code: 500, datos: [] };
  }
  return datos.data;
}