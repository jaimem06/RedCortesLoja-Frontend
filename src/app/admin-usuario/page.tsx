"use client";

import TablePersona from "@/components/Tables/TablePersona";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const PageAdminUser = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Admin Usuarios" />
        <TablePersona />
      </div>
    </DefaultLayout>
  );
};

export default PageAdminUser;
