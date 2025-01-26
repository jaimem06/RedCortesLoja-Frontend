import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableMota from "@/components/Tables/TableMota";

export const metadata: Metadata = {
  title:
  "RedCortesLoja",
  description: "Proyecto integrador del 5to ciclo de la carrera de Ingeniería en Computación.",
};

const PageAdminSensor = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Admintracion de Sensores" />
      </div>
      <TableMota/>
    </DefaultLayout>
  );
};

export default PageAdminSensor;
