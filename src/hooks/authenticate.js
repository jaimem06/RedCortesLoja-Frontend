import { POST } from './connection';

export async function login(data) {
  let datos = null;
  try {
    datos = await POST('home/login', data);
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error('Error during login:', error);
      return { code: 500, msg: 'Internal Server Error' };
    }
  }
  return datos.data;
}