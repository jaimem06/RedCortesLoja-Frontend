import { useRouter } from "next/navigation";
import { listar_usuarios } from "@/hooks/servicio_persona";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const TablePersona = () => {
  const ruta = useRouter();
  const ext = Cookies.get("external");
  let [data, setData] = useState(null);

  // Función para obtener la lista de usuarios
  const obtener_usuarios = async () => {
    try {
      const usuarios = await listar_usuarios();
      console.log("Respuesta de listar_usuarios:", usuarios);

      if (usuarios.data && usuarios.data.code === 200) {
        console.log("Datos de usuarios:", usuarios.data.datos);
        setData(usuarios.data.datos);
      } else {
        console.error("Error", usuarios);
      }
    } catch (error) {
      console.error("Error en listar_usuarios:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect ejecutado para obtener usuarios.");
    obtener_usuarios();
  }, []);

  // Función para redireccionar a registrar usuario
  function registrar_usuario() {
    ruta.push("admin-usuario/nuevo");
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <button
          title="Registrar nuevo usuario"
          className="hover:text-primary"
          onClick={() => registrar_usuario()}
          style={{ cursor: "pointer", opacity: "1", marginBottom: "20px" }}
        >
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 1.66667C10.3682 1.66667 10.6667 1.96517 10.6667 2.33333V8.66667H16.6667C17.0349 8.66667 17.3333 8.96517 17.3333 9.33333C17.3333 9.7015 17.0349 10 16.6667 10H10.6667V16.6667C10.6667 17.0349 10.3682 17.3333 10 17.3333C9.63183 17.3333 9.33333 17.0349 9.33333 16.6667V10H3.33333C2.96517 10 2.66667 9.7015 2.66667 9.33333C2.66667 8.96517 2.96517 8.66667 3.33333 8.66667H9.33333V2.33333C9.33333 1.96517 9.63183 1.66667 10 1.66667Z"
              fill=""
            />
          </svg>
        </button>
        <div
          className="max-w-full overflow-x-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <table className="w-full table-auto">
            <thead className="sticky top-0 z-10 bg-[#F7F9FC] text-left dark:bg-dark-2">
              <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                  Usuario
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                  Correo
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-3">
              {data &&
                data.map((persona, index) => (
                  <tr key={index}>
                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <h5 className="text-dark dark:text-white">
                        {persona.nombre + " " + persona.apellido}
                      </h5>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <p className="text-dark dark:text-white">
                        {persona.correo}
                      </p>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <p
                        className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${persona.estado ? "bg-[#219653]/[0.08] text-[#219653]" : "bg-[#EB5757]/[0.08] text-[#EB5757]"}`}
                      >
                        {persona.estado ? "Activo" : "Inactivo"}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablePersona;