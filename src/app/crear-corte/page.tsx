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
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [sectores, setSectores] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarSectores = async () => {
      const sectoresObtenidos = await obtenerSectores(); // Llamas a la función que hace la petición
      setSectores(sectoresObtenidos); // Estableces los sectores en el estado
      setLoading(false); // Cambias el estado de carga a false
    };

    cargarSectores();
  }, []);

  const sendInfo = async (data: FormData) => {
    try {
      const response = await crearCorte(data);
      if (response?.status === 201) {
        swal({
          title: "¡Éxito!",
          text: response.message,
          icon: "success",
          timer: 4000,
          closeOnEsc: true,
        });
      } else {
        swal({
          title: "Error",
          text: response?.message || "Ocurrió un error desconocido",
          icon: "error",
          timer: 4000,
          closeOnEsc: true,
        });
      }
    } catch (error: any) {
      swal({
        title: "Error",
        text: error?.response?.data?.error || "No se pudo conectar con el servidor",
        icon: "error",
        timer: 4000,
        closeOnEsc: true,
      });
      console.error("Error durante la creación del corte:", error);
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

          {/* Tipo de Corte */}
          <div>
            <label className="block text-gray-700 font-medium">Tipo de Corte</label>
            <select {...register('tipo', { required: true })} className="w-full p-2 border rounded-md">
              <option value="directo">Directo</option>
              <option value="porConfirmar">Por Confirmar</option>
            </select>
            {errors.tipo && <span className="text-red-500 text-sm">Este campo es requerido</span>}
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-gray-700 font-medium">Tipo</label>
            <select {...register('tipoCorte', { required: true })} className="w-full p-2 border rounded-md">
              <option value="Agua">Agua</option>
              <option value="Luz">Luz</option>
            </select>
            {errors.tipoCorte && <span className="text-red-500 text-sm">Este campo es requerido</span>}
          </div>

          {/* Sector */}
          <div>
            <label className="block text-gray-700 font-medium">Sector</label>
            <select {...register('sector', { required: true })} className="w-full p-2 border rounded-md">
              {loading ? (
                <option value="">Cargando sectores...</option>
              ) : sectores.length === 0 ? (
                <option value="">No se encontraron sectores</option>
              ) : (
                sectores.map((sector, index) => (
                  <option key={index} value={sector}>
                    {sector}
                  </option>
                ))
              )}
            </select>
            {errors.sector && <span className="text-red-500 text-sm">Este campo es requerido</span>}
          </div>

          {/* Botón de envío */}
          <button type="submit" className="w-full bg-[#83949E] text-white py-2 rounded-md hover:bg-[#6B7C88] transition">
            Guardar
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
}
