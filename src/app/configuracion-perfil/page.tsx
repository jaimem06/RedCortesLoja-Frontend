import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title:
  "RedCortesLoja",
  description: "Proyecto integrador del 5to ciclo de la carrera de Ingeniería en Computación.",
};

const ConfiguracionPerfil = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Configuracion Perfil" />
      </div>
    </DefaultLayout>
  );
};

export default ConfiguracionPerfil;
