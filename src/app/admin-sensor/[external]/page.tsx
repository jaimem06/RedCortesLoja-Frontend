"use client";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { buscar_mota, get_tipos, modify_mota } from "@/hooks/Service_mota";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import MapComponente1 from "@/components/Map/mapEdit";
interface FormData {
  ip_sensor: string;
  tipo: string;
  latitud: number;
  longitud: number;
  enlace :string;
  estado: boolean;
}

export default function Editar(params) {
  const router = useRouter();
  const [tiposMota, setTiposMota] = useState([]);
  const [mota, setMotas] = useState(null);
  const token = Cookies.get("token");
  const [lat, setLatitud] = useState(0); // Estado para latitud con valor predeterminado
  const [long, setLongitud] = useState(0); // Estado para longitud con valor predeterminado
  useEffect(() => {
    if (!mota) {
      buscar_mota(token, params.params).then((info) => {
        if (info.code == 200) {
          setMotas(info.datos);
        }
      });
    }
  }, [mota, token, params.params]);

  useEffect(() => {
    get_tipos(token).then((info) => {
      if (info.code === 200) {
        setTiposMota(info.datos);
      } else {
        setTiposMota([]);
      }
    });
  }, [token]);

  const validationSchema = Yup.object().shape({
    ip_sensor: Yup.string().trim().required("La IP del sensor es requerida"),
    tipo: Yup.string().trim().required("El tipo de mota es requerido"),
    latitud: Yup.number().required("La latitud es requerida"),
    longitud: Yup.number().required("La longitud es requerida"),
    estado: Yup.boolean().required("El estado es requerido"),
    enlace : Yup.string().trim().required("El enlace es requerido"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } = useForm<FormData>(formOptions);
  const { errors } = formState;

  useEffect(() => {
    if (mota) {
      setValue("ip_sensor", mota.ip_sensor);
      setValue("tipo", mota.tipo.toLowerCase());
      setValue("latitud", mota.latitud);
      setValue("longitud", mota.longitud);
      setValue("estado", mota.estado);
      setValue("enlace",mota.enlace);
      if(lat==0 && long==0)
        setLatitud(mota.latitud);
        setLongitud(mota.longitud);
        console.log(lat, long);

    }
  }, [mota, setValue,setLatitud,setLongitud]);

  const onSubmit = (data: FormData) => {
    modify_mota(data, params.params, token).then((info) => {
      if (info && info.status == 200) {
        swal({
          title: "Registro exitoso",
          text: "Mota actualizada correctamente",
          icon: "success",
          timer: 6000,
          closeOnEsc: true,
        });
        router.push("/admin-sensor");
      } else {
        swal({
          title: "Error",
          text: info ? info.datos.error : "Error desconocido",
          icon: "error",
          timer: 6000,
          closeOnEsc: true,
        });
      }
    });
  };

  const cancelar = () => {
    router.push("/admin-sensor");
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Editar Mota" />
        </div>

<div className="flex flex-wrap justify-center gap-4">
<div className="flex flex-row justify-between w-full">
<div className="w-1/2 p-4">
<MapComponente1 lat={lat} lng={long} zoom={18} onMapClick={(lat, lng) => {
  
    setLatitud(lat);
    setLongitud(lng);
    setValue("latitud", lat);
    setValue("longitud", lng);
  }} />
</div>


<div className="w-1/2 max-w-md mx-auto">
      <form
        className="mx-auto max-w-md rounded-[10px] border border-stroke bg-white p-4 shadow-md dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
            htmlFor="latitud"
          >
            Latitud
          </label>
          <div className="relative">
            <input
              type="text"
              id="latitud"
              {...register("latitud")}
              placeholder="Ingrese la latitud"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            {errors.latitud && (
              <div className="text-danger mt-1">{errors.latitud?.message}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
            htmlFor="longitud"
          >
            Longitud
          </label>
          <div className="relative">
            <input
              type="text"
              id="longitud"
              {...register("longitud")}
              placeholder="Ingrese la longitud"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            {errors.longitud && (
              <div className="text-danger mt-1">{errors.longitud?.message}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
            htmlFor="ip_sensor"
          >
            IP del sensor
          </label>
          <div className="relative">
            <input
              type="text"
              id="ip_sensor"
              {...register("ip_sensor")}
              placeholder="Ingrese la IP del sensor"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            {errors.ip_sensor && (
              <div className="text-danger mt-1">{errors.ip_sensor?.message}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
            htmlFor="estado"
          >
            Estado de la Mota
          </label>
          <div className="relative">
            <select
              id="estado"
              {...register("estado", {
                setValueAs: (value) => value === "true",
              })}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            >
              <option value="">Seleccione un estado</option>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
            {errors.estado && (
              <div className="text-danger mt-1">{errors.estado?.message}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
            htmlFor="tipo"
          >
            Tipo de Sensor
          </label>
          <div className="relative">
            <select
              id="tipo"
              {...register("tipo")}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            >
              <option value="">Seleccione un tipo</option>
              {tiposMota.map((tipo, index) => (
                <option key={index} value={tipo.toLowerCase()}>
                  {tipo}
                </option>
              ))}
            </select>
            {errors.tipo && (
              <div className="text-danger mt-1">{errors.tipo?.message}</div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label
            className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
            htmlFor="enlace"
          >
            enlace del sensor
          </label>
          <div className="relative">
            <input
              type="text"
              id="enlace"
              {...register("enlace")}
              placeholder="enlace del sensor"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            {errors.enlace && (
              <div className="text-danger mt-1">{errors.enlace?.message}</div>
            )}
          </div>
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
      </div>
      </div>
      </div>
    </DefaultLayout>
  );
}
