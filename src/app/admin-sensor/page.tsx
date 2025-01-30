'use client';
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableSectores from "@/components/Tables/TableSectores";

const PageAdminSensor = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Admintracion de Sectores" />
        <TableSectores />
      </div>
    </DefaultLayout>
  );
};

export default PageAdminSensor;
