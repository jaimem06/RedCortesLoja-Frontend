"use client";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import MapComponente from "@/components/Map/map_ubicacion_s";

const PageUbicacionSensores = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Ubicacion Sectores de Loja" />
        <MapComponente zoom={17} />
      </div>
    </DefaultLayout>
  );
};

export default PageUbicacionSensores;