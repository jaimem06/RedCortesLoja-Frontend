"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import swal from "sweetalert";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { modificar_persona, obtener_persona } from "@/hooks/servicio_persona";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import FormularioCredenciales from "../c/[ext]/page";

interface FormData {
  nombre: string;
  apellido: string;
  correo: string;
}

const FormularioPersona = () => {
  const router = useRouter();
  const external = useParams().external;
  const expresion_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  let [persona, setPersona] = useState(null);
  console.log(external);

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().trim().required("El nombre es obligatorio"),
    apellido: Yup.string().trim().required("El apellido es obligatorio"),
    correo: Yup.string()
      .trim()
      .email()
      .matches(expresion_email, "Correo incorrecto")
      .required("El correo es obligatorio"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } =
    useForm<FormData>(formOptions);
  const errors = formState.errors;

  useEffect(() => {
    obtener_persona(external).then((res) => {
      if (res && res.code === 200) {
        setPersona(res.datos);
        setValue("nombre", res.datos.nombre);
        setValue("apellido", res.datos.apellido);
        setValue("correo", res.datos.cuenta.correo);
      } else {
        console.log("Error");
      }
    });
  }, [external, setValue]);

  const enviar_data = (data: FormData) => {
    //data["correo"]=persona.cuenta.correo;
    console.log(data);
    modificar_persona(data, external).then((info) => {
      console.log(info);
      if (info && info.code === 200) {
        console.log(info);
        swal({
          title: "Modificado Correctamente",
          text: info.data.tag,
          icon: "success",
          timer: 6000,
          closeOnEsc: true,
        });
        router.push("/admin-usuario");
        router.refresh();
      } else {
        swal({
          title: "Error",
          text: info.datos.error,
          icon: "error",
          timer: 6000,
          closeOnEsc: true,
        });
        console.log(info);
        console.log("NO");
      }
    });
  };
  const cancelar = () => {
    router.push("/admin-usuario");
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Modificar datos personales" />
      </div>
      <form
        className="mx-auto max-w-md rounded-[10px] border border-stroke bg-white p-4 shadow-md dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5"
        onSubmit={handleSubmit(enviar_data)}
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-dark dark:text-white"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <div className="relative">
            <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.0008 1.0415C7.81464 1.0415 6.04243 2.81371 6.04243 4.99984C6.04243 7.18596 7.81464 8.95817 10.0008 8.95817C12.1869 8.95817 13.9591 7.18596 13.9591 4.99984C13.9591 2.81371 12.1869 1.0415 10.0008 1.0415ZM7.29243 4.99984C7.29243 3.50407 8.50499 2.2915 10.0008 2.2915C11.4965 2.2915 12.7091 3.50407 12.7091 4.99984C12.7091 6.49561 11.4965 7.70817 10.0008 7.70817C8.50499 7.70817 7.29243 6.49561 7.29243 4.99984Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.0008 10.2082C8.0728 10.2082 6.29653 10.6464 4.9803 11.3868C3.68367 12.1161 2.7091 13.2216 2.7091 14.5832L2.70904 14.6681C2.7081 15.6363 2.70692 16.8515 3.77277 17.7195C4.29733 18.1466 5.03116 18.4504 6.0226 18.6511C7.01681 18.8523 8.31262 18.9582 10.0008 18.9582C11.6889 18.9582 12.9847 18.8523 13.9789 18.6511C14.9704 18.4504 15.7042 18.1466 16.2288 17.7195C17.2946 16.8515 17.2934 15.6363 17.2925 14.6681L17.2924 14.5832C17.2924 13.2216 16.3179 12.1161 15.0212 11.3868C13.705 10.6464 11.9287 10.2082 10.0008 10.2082ZM3.9591 14.5832C3.9591 13.8737 4.47691 13.1041 5.59313 12.4763C6.68976 11.8594 8.24682 11.4582 10.0008 11.4582C11.7547 11.4582 13.3118 11.8594 14.4084 12.4763C15.5246 13.1041 16.0424 13.8737 16.0424 14.5832C16.0424 15.673 16.0088 16.2865 15.4394 16.7502C15.1307 17.0016 14.6145 17.2471 13.7309 17.4259C12.8501 17.6042 11.646 17.7082 10.0008 17.7082C8.35558 17.7082 7.15138 17.6042 6.27059 17.4259C5.38703 17.2471 4.87086 17.0016 4.56209 16.7502C3.99269 16.2865 3.9591 15.673 3.9591 14.5832Z"
                  fill=""
                />
              </svg>
            </span>
            <input
              type="text"
              id="nombre"
              required
              {...register("nombre")}
              defaultValue={persona && persona.nombre}
              className="dark:border-dark-3w-full w-full rounded rounded-[7px] border border-[1.5px] border-[#eee] border-stroke bg-white px-3 py-2 py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          {errors.nombre && (
            <div className="text-danger mt-1">{errors.nombre?.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-dark dark:text-white"
            htmlFor="apellido"
          >
            Apellido
          </label>
          <div className="relative">
            <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.0008 1.0415C7.81464 1.0415 6.04243 2.81371 6.04243 4.99984C6.04243 7.18596 7.81464 8.95817 10.0008 8.95817C12.1869 8.95817 13.9591 7.18596 13.9591 4.99984C13.9591 2.81371 12.1869 1.0415 10.0008 1.0415ZM7.29243 4.99984C7.29243 3.50407 8.50499 2.2915 10.0008 2.2915C11.4965 2.2915 12.7091 3.50407 12.7091 4.99984C12.7091 6.49561 11.4965 7.70817 10.0008 7.70817C8.50499 7.70817 7.29243 6.49561 7.29243 4.99984Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.0008 10.2082C8.0728 10.2082 6.29653 10.6464 4.9803 11.3868C3.68367 12.1161 2.7091 13.2216 2.7091 14.5832L2.70904 14.6681C2.7081 15.6363 2.70692 16.8515 3.77277 17.7195C4.29733 18.1466 5.03116 18.4504 6.0226 18.6511C7.01681 18.8523 8.31262 18.9582 10.0008 18.9582C11.6889 18.9582 12.9847 18.8523 13.9789 18.6511C14.9704 18.4504 15.7042 18.1466 16.2288 17.7195C17.2946 16.8515 17.2934 15.6363 17.2925 14.6681L17.2924 14.5832C17.2924 13.2216 16.3179 12.1161 15.0212 11.3868C13.705 10.6464 11.9287 10.2082 10.0008 10.2082ZM3.9591 14.5832C3.9591 13.8737 4.47691 13.1041 5.59313 12.4763C6.68976 11.8594 8.24682 11.4582 10.0008 11.4582C11.7547 11.4582 13.3118 11.8594 14.4084 12.4763C15.5246 13.1041 16.0424 13.8737 16.0424 14.5832C16.0424 15.673 16.0088 16.2865 15.4394 16.7502C15.1307 17.0016 14.6145 17.2471 13.7309 17.4259C12.8501 17.6042 11.646 17.7082 10.0008 17.7082C8.35558 17.7082 7.15138 17.6042 6.27059 17.4259C5.38703 17.2471 4.87086 17.0016 4.56209 16.7502C3.99269 16.2865 3.9591 15.673 3.9591 14.5832Z"
                  fill=""
                />
              </svg>
            </span>
            <input
              type="text"
              id="apellido"
              required
              {...register("apellido")}
              defaultValue={persona && persona.apellido}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          {errors && (
            <div className="text-danger mt-1">{errors.apellido?.message}</div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={cancelar}
            className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
          >
            Guardar
          </button>
        </div>
        <div className="text-start font-bold" style={{ marginTop: "2rem" }}>
          <Link
            href={"/admin-usuario/c/" + external}
            className="text-blue-500 hover:text-blue-700"
          >
            <u>Modificar credenciales</u>
          </Link>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default FormularioPersona;
