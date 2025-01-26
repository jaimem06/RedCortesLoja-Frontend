"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { guardar_persona } from "@/hooks/servicio_persona";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface FormData {
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
}

const FormularioPersona = () => {
  const router = useRouter();
  const expresion_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const expresion_clave =
    /^(?=.*[0-9])(?=.*[!@#~=+?$%^&*])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d!@#~=+?$%^&*]{8,20}$/;

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().trim().required("El nombre es requerido"),
    apellido: Yup.string().trim().required("El apellido es requerido"),
    correo: Yup.string()
      .trim()
      .email()
      .matches(expresion_email, "Correo incorrecto")
      .required("El correo es requerido"),
    clave: Yup.string()
      .trim()
      .matches(
        expresion_clave,
        "La clave debe tener almenos 8 caracteres alfanumericos, una mayuscula, un numero y un caracter especial",
      )
      .min(8, "La clave debe tener almenos 8 caracteres alfanumericos")
      .max(30, "La clave no debe mas de 30 caracteres alfanumericos")
      .required("La clave es requerida"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm<FormData>(formOptions);
  const errors = formState.errors;

  const enviar_data = (data: FormData) => {
    guardar_persona(data).then((info) => {
      if (info && info.code === 200) {
        console.log(info);
        swal({
          title: "Guardado Exitoso",
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
        <Breadcrumb pageName="Registro Usuarios" />
      </div>
      <form
        className="mx-auto max-w-md rounded-[10px] border border-stroke bg-white p-4 shadow-md dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5"
        onSubmit={handleSubmit(enviar_data)}
      >
        <div className="mb-4">
          <label
            className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
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
              placeholder="Ingrese su nombre"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          {errors.nombre && (
            <div className="text-danger mt-1">{errors.nombre?.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
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
              placeholder="Ingrese su apellido"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          {errors && (
            <div className="text-danger mt-1">{errors.apellido?.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
            htmlFor="correo"
          >
            Correo
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
                  d="M8.28567 2.7085H11.713C13.2445 2.70848 14.4575 2.70847 15.4069 2.83611C16.3839 2.96747 17.1747 3.24423 17.7983 3.86787C18.4219 4.4915 18.6987 5.28229 18.8301 6.25931C18.9577 7.20866 18.9577 8.42169 18.9577 9.95315V10.0472C18.9577 11.5786 18.9577 12.7917 18.8301 13.741C18.6987 14.718 18.4219 15.5088 17.7983 16.1325C17.1747 16.7561 16.3839 17.0329 15.4069 17.1642C14.4575 17.2919 13.2445 17.2918 11.713 17.2918H8.28567C6.75421 17.2918 5.54118 17.2919 4.59183 17.1642C3.61481 17.0329 2.82402 16.7561 2.20039 16.1325C1.57675 15.5088 1.29999 14.718 1.16863 13.741C1.04099 12.7917 1.041 11.5786 1.04102 10.0472V9.95315C1.041 8.42168 1.04099 7.20866 1.16863 6.25931C1.29999 5.28229 1.57675 4.4915 2.20039 3.86787C2.82402 3.24423 3.61481 2.96747 4.59183 2.83611C5.54118 2.70847 6.7542 2.70848 8.28567 2.7085ZM4.75839 4.07496C3.91998 4.18768 3.43694 4.39907 3.08427 4.75175C2.73159 5.10442 2.5202 5.58746 2.40748 6.42587C2.29234 7.28226 2.29102 8.41115 2.29102 10.0002C2.29102 11.5892 2.29234 12.7181 2.40748 13.5745C2.5202 14.4129 2.73159 14.8959 3.08427 15.2486C3.43694 15.6013 3.91998 15.8126 4.75839 15.9254C5.61478 16.0405 6.74367 16.0418 8.33268 16.0418H11.666C13.255 16.0418 14.3839 16.0405 15.2403 15.9254C16.0787 15.8126 16.5618 15.6013 16.9144 15.2486C17.2671 14.8959 17.4785 14.4129 17.5912 13.5745C17.7064 12.7181 17.7077 11.5892 17.7077 10.0002C17.7077 8.41115 17.7064 7.28226 17.5912 6.42587C17.4785 5.58746 17.2671 5.10442 16.9144 4.75175C16.5618 4.39907 16.0787 4.18768 15.2403 4.07496C14.3839 3.95982 13.255 3.9585 11.666 3.9585H8.33268C6.74367 3.9585 5.61478 3.95982 4.75839 4.07496ZM4.51921 6.26671C4.74019 6.00154 5.13429 5.96571 5.39946 6.18669L7.19854 7.68592C7.97601 8.33381 8.51579 8.78218 8.9715 9.07527C9.41263 9.35899 9.71179 9.45423 9.99935 9.45423C10.2869 9.45423 10.5861 9.35899 11.0272 9.07527C11.4829 8.78218 12.0227 8.33381 12.8002 7.68592L14.5992 6.18669C14.8644 5.96571 15.2585 6.00154 15.4795 6.26671C15.7005 6.53189 15.6646 6.92599 15.3995 7.14697L13.5691 8.67231C12.8304 9.28785 12.2318 9.78676 11.7034 10.1266C11.153 10.4806 10.6169 10.7042 9.99935 10.7042C9.38179 10.7042 8.84574 10.4806 8.29533 10.1266C7.76695 9.78677 7.16828 9.28786 6.42965 8.67232L4.59923 7.14697C4.33406 6.92599 4.29823 6.53189 4.51921 6.26671Z"
                  fill=""
                />
              </svg>
            </span>
            <input
              type="email"
              id="correo"
              required
              {...register("correo")}
              placeholder="Ingrese su correo electronico"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          {errors && (
            <div className="text-danger mt-1">{errors.correo?.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
            htmlFor="clave"
          >
            Clave
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
                  d="M10 1C6.68629 1 4 3.68629 4 7V9C3.44772 9 3 9.44772 3 10V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44772 16.5523 9 16 9V7C16 3.68629 13.3137 1 10 1ZM6 9V7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7V9H6ZM5 11H15V15H5V11ZM9 13H11V15H9V13Z"
                  fill=""
                />
              </svg>
            </span>
            <input
              type="password"
              id="clave"
              required
              {...register("clave")}
              placeholder="Ingrese su clave"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          {errors && (
            <div className="text-danger mt-1">{errors.clave?.message}</div>
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
      </form>
    </DefaultLayout>
  );
};

export default FormularioPersona;
