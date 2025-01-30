import { POSTU } from './connection';
import { GETU } from './connection';
import { GET } from './connection';


export async function crearCorte(data) {
  let response = null;
  try {
    const corteData = {
      tipo: data.tipo,
      tipoCorte: data.tipoCorte,
      sector: data.sector
    };

    response = await POSTU('cortes/crear', corteData);

    if (response && response.status === 201) {
      // Retornar solo un mensaje de éxito en lugar de toda la respuesta
      return { status: 201, message: "El corte se realizó con éxito y la notificación ha sido enviada." };
    } else {
      return { status: response.status || 500, message: 'Ocurrió un error desconocido' };
    }
  } catch (error) {
    console.error('Error durante la creación del corte:', error);
    return { status: 500, message: 'Error interno del servidor' };
  }
}



export async function obtenerCortes() {
  try {
    const response = await GETU('cortes/cortes');
    return response.data.cortes; // Extraemos solo el array de cortes
  } catch (error) {
    console.error('Error obteniendo los cortes:', error);
    return [];
  }
}


export async function obtenerSectores() {
  try {
    // Hacemos la llamada a la API de los sectores
    const response = await GET('ubicacion/listar');
    
    // Verificamos la respuesta y extraemos solo los nombres de los sectores
    if (response && response.data) {
      console.log('Sectores obtenidos:', response.data);
      return response.data.map(item => item.nombre); // Extraemos solo los nombres
    }

    // Si no hay datos, retornamos un array vacío
    return [];
  } catch (error) {
    console.error('Error obteniendo los sectores:', error);
    return [];
  }
}
