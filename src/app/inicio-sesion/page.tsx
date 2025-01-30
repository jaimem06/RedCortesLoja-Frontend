'use client';
import './login.css';
import { login } from '@/hooks/authenticate';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface FormData {
  correo: string;
  contraseña: string;
}

export default function Login() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    correo: Yup.string().trim().email('Correo inválido').required('El correo es requerido'),
    contraseña: Yup.string().trim().required('La contraseña es requerida'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const sendInfo = async (data: FormData) => {
    try {
      const info = await login(data);
      
      if (info.code === 200) {
        Cookies.set('token', info.datos.token);
        Cookies.set('user', info.datos.user);
        Cookies.set('external', info.datos.external);

        swal({
          title: 'Bienvenido',
          text: `Hola, ${info.datos.user}!`,
          icon: 'success',
          timer: 4000,
          closeOnEsc: true,
        });

        router.push('/');
      } else {
        swal({
          title: 'Error',
          text: info.datos.error,
          icon: 'error',
          timer: 4000,
          closeOnEsc: true,
        });
      }
    } catch (error) {
      console.error('Error en login:', error);
      swal({
        title: 'Error',
        text: 'Hubo un problema al iniciar sesión',
        icon: 'error',
        timer: 4000,
        closeOnEsc: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(sendInfo)} className="card">
      <div className="login">Bienvenido</div>
      
      <div className="inputBox">
        <input type="email" {...register('correo')} placeholder="Correo electrónico" />
        {errors.correo && <span className="error">{errors.correo.message}</span>}
      </div>

      <div className="inputBox">
        <input type="password" {...register('contraseña')} placeholder="Contraseña" />
        {errors.contraseña && <span className="error">{errors.contraseña.message}</span>}
      </div>

      <button type="submit" className="btnlogin" disabled={isSubmitting}>
        {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}
