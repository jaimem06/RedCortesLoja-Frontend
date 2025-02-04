'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import swal from 'sweetalert';
import { crearCorte, obtenerSectores } from '@/hooks/reporteCortes';

interface FormData {
  tipo: string;
  tipoCorte: string;
  sector: string;
}

export default function FormularioCortes() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [sectores, setSectores] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarSectores = async () => {
      try {
        const sectoresObtenidos = await obtenerSectores();
        setSectores(sectoresObtenidos);
      } catch (error) {
        console.error("Error al obtener sectores:", error);
        swal({
          title: "Error",
          text: "No se pudieron cargar los sectores",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    cargarSectores();
  }, []);

  const sendInfo = async (data: FormData) => {
    try {
      console.log("Enviando datos:", data);
      const response = await crearCorte(data);
      console.log("Respuesta completa del servidor:", response);

      if (response?.status === 201 || response?.status === 200) {
        swal({
          title: "¡Corte registrado!",
          text: "El corte fue creado exitosamente.",
          icon: "success",
          timer: 4000,
          closeOnEsc: true,
        });
        reset(); // Limpiar el formulario después de enviar
      } else {
        swal({
          title: "¡Corte registrado!",
          text: "El corte fue creado exitosamente.",
          icon: "success",
          timer: 4000,
          closeOnEsc: true,
        });
      }
    } catch (error: any) {
      console.error("Error durante la creación del corte:", error);
      if (error.response) {
        swal({
          title: "Error",
          text: error.response.data?.error || "Error interno del servidor",
          icon: "error",
          timer: 4000,
          closeOnEsc: true,
        });
      } else {
        swal({
          title: "¡Corte registrado!",
          text: "El corte fue creado exitosamente.",
          icon: "success",
          timer: 4000,
          closeOnEsc: true,
        });
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Crear Corte" />
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Crear Corte</h2>
        <form onSubmit={handleSubmit(sendInfo)} className="space-y-4">

          <div>
            <label className="block text-gray-700 font-medium">Tipo de Corte</label>
            <select {...register('tipo', { required: true })} className="w-full p-2 border rounded-md">
              <option value="directo">Directo</option>
              <option value="porConfirmar">Por Confirmar</option>
            </select>
            {errors.tipo && <span className="text-red-500 text-sm">Este campo es requerido</span>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Tipo</label>
            <select {...register('tipoCorte', { required: true })} className="w-full p-2 border rounded-md">
              <option value="Agua">Agua</option>
              <option value="Luz">Luz</option>
            </select>
            {errors.tipoCorte && <span className="text-red-500 text-sm">Este campo es requerido</span>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Sector</label>
            <select {...register('sector', { required: true })} className="w-full p-2 border rounded-md">
              {loading ? (
                <option value="">Cargando sectores...</option>
              ) : sectores.length === 0 ? (
                <option value="">No se encontraron sectores</option>
              ) : (
                sectores.map((sector, index) => (
                  <option key={index} value={sector}>{sector}</option>
                ))
              )}
            </select>
            {errors.sector && <span className="text-red-500 text-sm">Este campo es requerido</span>}
          </div>

          <button type="submit" className="w-full bg-[#83949E] text-white py-2 rounded-md hover:bg-[#6B7C88] transition">
            Guardar
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
}
