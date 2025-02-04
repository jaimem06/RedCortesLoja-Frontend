import { NextResponse } from 'next/server';

async function validarTokenBackend(token) {
  const url = 'https://serviciousuariosubicaciones-akc5c9b3b2edetg4.canadacentral-01.azurewebsites.net/validaciones/token';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    return { code: 500, msg: 'Internal Server Error' };
  }
}

export async function middleware(request) {
  const token = request.cookies.get('token');

  if (!token) {
    const url = new URL('/inicio-sesion', request.url);
    return NextResponse.redirect(url);
  }

  const validacion = await validarTokenBackend(token);
  if (validacion.code !== 200) {
    const url = new URL('/inicio-sesion', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin-usuario/:path*', // aplica para todas las rutas que empiecen con /admin-usuario
/*     '/admin-sectores',
    '/ubicacion-sensor',
    '/configuracion-perfil', */
    '/'
  ],
};