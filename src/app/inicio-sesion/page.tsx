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
    correo: Yup.string().trim().required('El correo es requerido'),
    contraseña: Yup.string().trim().required('La contraseña es requerida')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm<FormData>(formOptions);

  const sendInfo = (data: FormData) => {
    login(data).then((info) => {
      if (info.code === 200) {
        console.log(info);
        Cookies.set('token', info.datos.token);
        Cookies.set('user', info.datos.user);
        Cookies.set('external', info.datos.external);
        console.log(info.datos.user);
        swal({
          title: "Bienvenido",
          text: info.datos.user,
          icon: "success",
          timer: 4000,
          closeOnEsc: true,
        });
        router.push('/');
        router.refresh();
      } else {
        swal({
          title: "Error",
          text: info.datos.error,
          icon: "error",
          timer: 4000,
          closeOnEsc: true,
        });
        console.log(info);
        console.log("NO");
      }
    });
  };

  return (
      <form onSubmit={handleSubmit(sendInfo)} className="card">
        <div className="login">Bienvenido</div>
        <div className="inputBox">
          <input type="text" required {...register('correo')} />
          <span className="user">Usuario</span>
        </div>
        <div className="inputBox">
          <input type="password" required {...register('contraseña')} />
          <span>contraseña</span>
        </div>
        <button type="submit" className="btnlogin">Iniciar Sesión</button>
      </form>
  );
}