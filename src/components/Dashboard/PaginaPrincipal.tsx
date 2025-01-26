"use client";
import MapComponente from "@/components/Map/map_ubicacion_s";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const PaginaPrincipal = () => {
  return (
    <div className="mx-auto max-w-7xl">
    <Breadcrumb pageName="Ubicacion Sectores de Loja" />
    <MapComponente zoom={17} />
  </div>
  );
};

export default PaginaPrincipal;