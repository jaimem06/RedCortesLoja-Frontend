import { POST, GET, DELETE } from './connection';

export const guardarPoligono = async (data) => {
    return await POST('ubicacion/poligonos', data);
};
export const obtenerPoligonos = async () => {
    return await GET('ubicacion/listar');
};
export const eliminarPoligono  = async (id) => {
    return await DELETE(`ubicacion/eliminar/${id}`);
};