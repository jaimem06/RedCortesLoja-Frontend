'use client';
import React, { useState, useEffect } from 'react';
import { obtenerCortes } from '@/hooks/reporteCortes';
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface Corte {
  id: string;
  tipo: string;
  tipoCorte: string;
  sector: string;
  estado: string;
  fechaReporte: string;
}

const TableCortes: React.FC = () => {
  const [cortes, setCortes] = useState<Corte[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await obtenerCortes();
        setCortes(data);
      } catch (error: any) {
        setError(error.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredCortes = cortes.filter(corte => {
    return Object.values(corte).some(value => 
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Historial Cortes" />
      </div>
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1">
        <div className="mb-4 flex justify-between">
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
              <tr className="bg-[#83949E] text-left">
                <th className="px-4 py-4">ID</th>
                <th className="px-4 py-4">TipoMensaje</th>
                <th className="px-4 py-4">tipoCorte</th>
                <th className="px-4 py-4">Sector</th>
                <th className="px-4 py-4">Estado</th>
                <th className="px-4 py-4">Fecha Reporte</th>
              </tr>
            </thead>
            <tbody>
              {filteredCortes.length > 0 ? (
                filteredCortes.map((corte) => (
                  <tr key={corte.id}>
                    <td className="px-4 py-4">{corte.id}</td>
                    <td className="px-4 py-4">{corte.tipo}</td>
                    <td className="px-4 py-4">{corte.tipoCorte}</td>
                    <td className="px-4 py-4">{corte.sector}</td>
                    <td className="px-4 py-4">{corte.estado}</td>
                    <td className="px-4 py-4">{new Date(corte.fechaReporte).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center">No hay cortes registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TableCortes;
