'use client';
import React, { useState, useEffect } from 'react';
import { motas } from '@/hooks/Service_mota';
import { FiEdit } from 'react-icons/fi';
import Link from 'next/link';

// Definición de la interfaz Sensor para coincidir con la estructura de datos
interface Sensor {
  estado: boolean;
  external_id: string;
  id: number;
  ip_sensor: string;
  latitud: number;
  longitud: number;
  tipo: string;
}

const TableMota: React.FC = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await motas();
        if (data.code && data.code !== 200) throw new Error(data.msg || 'Error al cargar los datos');
        setSensors(data);
      } catch (error: any) {
        setError(error.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredSensors = sensors.filter(sensor =>
    sensor.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sensor.latitud.toString().includes(searchTerm) ||
    sensor.longitud.toString().includes(searchTerm) ||
    sensor.estado.toString().toLowerCase().includes(searchTerm.toLowerCase())

  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="mb-4 flex justify-between">
      <Link href="/admin-sensor/new" className="text-blue-500 hover:text-blue-700">
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
          Crear Nueva Mota
        </button>
      </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full p-2 border rounded-md"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#83949E] text-left dark:bg-dark-2">
            <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                ip de mota
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Tipo de Sensor
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Latitud
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Longitud
              </th>

              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                Estado
              </th>
              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSensors.map(sensor => (
              <tr key={sensor.id}>
                   <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 border-b">
                  <h5 className="text-dark dark:text-white">
                    {sensor.ip_sensor}
                  </h5>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 border-b">
                  <h5 className="text-dark dark:text-white">
                    {sensor.tipo}
                  </h5>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 border-b">
                  <p className="text-dark dark:text-white">
                    {sensor.latitud}
                  </p>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 border-b">
                  {sensor.longitud}
                </td>

                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 border-b xl:pr-7.5 text-right">
                  <span className={`px-2 py-1 rounded-full ${sensor.estado ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {sensor.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 border-b xl:pr-7.5 text-right">
                  <div className="flex items-center justify-end space-x-3.5">
                    {/* Botones de acción */}
                    <Link href={`/admin-sensor/${sensor.external_id}`} className="text-blue-500 hover:text-blue-700">
                      <FiEdit size={20} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableMota;
