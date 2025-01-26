import PaginaPrincipal from "@/components/Dashboard/PaginaPrincipal";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";

export const metadata: Metadata = {
  title:
    "RedCortesLoja",
  description: "Proyecto integrador del 5to ciclo de la carrera de Ingeniería en Computación.",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <PaginaPrincipal/>
      </DefaultLayout>
    </>
  );
}
