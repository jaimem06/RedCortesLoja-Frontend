import Cookies from 'js-cookie';
import { GET } from './connection';

export async function validar_token() {
    let datos = null;

    try {
        const token = Cookies.get('token');
        datos = await GET('validar_token', token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 }
    }
    return datos.data;
    // TODO agarrar errores
}