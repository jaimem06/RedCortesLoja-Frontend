import { useRouter } from "next/navigation";
import { modificar_estado, listar_personas } from "@/hooks/servicio_persona";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Cookies from "js-cookie";

const TablePersona = () => {
  const ruta = useRouter();
  const ext = Cookies.get("external");
  let [data, setData] = useState(null);

  //funcion para obtener la lista de usuarios
  const obtener_usuarios = () => {
    listar_personas().then((usuarios) => {
      if (usuarios && usuarios.code === 200) {
        setData(usuarios.datos);
      } else {
        console.log("Error");
      }
    });
  };
  // useEffect para obtener la lista de usuarios
  useEffect(() => {
    obtener_usuarios();
  }, []);

  //funcion para redireccionar a editar usuario
  function boton_click(external: string): void {
    ruta.push("admin-usuario/" + external);
  }
  //funcion para redireccionar a registrar usuario
  function registrar_usuario() {
    ruta.push("admin-usuario/nuevo");
  }
  //funcion para cambiar el estado de la cuenta del usuario
  function cambiar_estado(external: string, estado: boolean) {
    if (estado === true) {
      swal({
        title: "¿Está seguro de desactivar la cuenta?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        buttons: {
          cancel: {
            text: "Cancelar", // Nombre del botón de cancelar
            value: false,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Aceptar", // Nombre del botón de aceptar
            value: true,
            visible: true,
            className: "btn-danger",
            closeModal: true,
          },
        },
        dangerMode: true,
      }).then((aceptar) => {
        if (!aceptar) {
          return;
        } else {
          modificar_estado(external).then((res) => {
            if (res && res.code === 200) {
              obtener_usuarios();
              swal({
                title: "Exito",
                text: res.data.tag,
                icon: "success",
                button: "Aceptar",
              });
              cerrar_sesion(external);
            } else {
              swal({
                title: "Error",
                text: res.datos.error,
                icon: "error",
                button: "Aceptar",
              });
            }
          });
        }
      });
    } else {
      swal({
        title: "¿Está seguro de activar la cuenta?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        buttons: {
          cancel: {
            text: "Cancelar", // Nombre del botón de cancelar
            value: false,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Aceptar", // Nombre del botón de aceptar
            value: true,
            visible: true,
            className: "btn-success",
            closeModal: true,
          },
        },
      }).then((aceptar) => {
        if (!aceptar) {
          return;
        } else {
          modificar_estado(external).then((res) => {
            if (res && res.code === 200) {
              obtener_usuarios();
              swal({
                title: "Exito",
                text: res.data.tag,
                icon: "success",
                button: "Aceptar",
              });
            } else {
              swal({
                title: "Error",
                text: res.datos.error,
                icon: "error",
                button: "Aceptar",
              });
            }
          });
        }
      });
    }
  }

  function cerrar_sesion(external: String) {
    if (ext === external) {
      Cookies.remove("external");
      Cookies.remove("token");
      Cookies.remove("user");
      ruta.push("/inicio-sesion");
    }
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
                <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                  Acciones
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
                        {persona.cuenta.correo}
                      </p>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <p
                        className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${
                          persona.cuenta.estado === true
                            ? "bg-[#219653]/[0.08] text-[#219653]"
                            : "bg-[#D34053]/[0.08] text-[#D34053]"
                        }`}
                      >
                        {persona.cuenta.estado === true ? "Activo" : "Inactivo"}
                      </p>
                    </td>
                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <div className="flex items-center justify-end space-x-3.5">
                        <button
                          title={persona.cuenta.estado ? "Editar persona" : ""}
                          className="hover:text-primary"
                          disabled={!persona.cuenta.estado}
                          onClick={() => boton_click(persona.external)}
                          style={{
                            cursor: !persona.cuenta.estado
                              ? "not-allowed"
                              : "pointer",
                            opacity: !persona.cuenta.estado ? "0.5" : "1",
                          }}
                        >
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21 2.99984C21.2652 2.73463 21.5196 2.48118 21.7791 2.22068C22.0488 1.95098 22.3186 1.68115 22.5913 1.41016C22.9328 1.06872 23.4328 0.999511 23.8417 1.19682C24.2353 1.38971 24.4827 1.87349 24.4456 2.29245C24.4016 2.78995 24.0933 3.18351 23.6913 3.58551C23.4178 3.85904 23.147 4.12892 22.8784 4.39903C22.6176 4.65815 22.3643 4.91257 22.1002 5.17992L19.75 7.52984L16.47 4.24984L18.82 1.89984C19.0873 1.63584 19.3417 1.38257 19.6008 1.1218C19.8709 0.853131 20.1408 0.582345 20.4144 0.308742C20.8163 -0.0931077 21.2099 -0.401401 21.7074 -0.445373C22.1264 -0.482482 22.6102 -0.235142 22.8031 0.158473C23.0004 0.56738 22.9312 1.06738 22.5897 1.40884C22.3187 1.68153 22.0489 1.95135 21.7791 2.22099C21.5196 2.48047 21.2652 2.73489 21 2.99984ZM2 20.0001L6.0001 22.0001L16.4699 11.5303L12.47 7.5303L2 17.0001V20.0001Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>

                        <button
                          title={
                            persona.cuenta.estado
                              ? "Desactivar cuenta"
                              : "Activar cuenta"
                          }
                          className="hover:text-primary"
                          onClick={() =>
                            cambiar_estado(
                              persona.external,
                              persona.cuenta.estado,
                            )
                          }
                          style={{
                            cursor: "pointer",
                            opacity: "1",
                            color: persona.cuenta.estado
                              ? "#D34053"
                              : "#219653",
                          }}
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
                              d="M8.59048 1.87502H11.4084C11.5887 1.8749 11.7458 1.8748 11.8941 1.89849C12.4802 1.99208 12.9874 2.35762 13.2615 2.88403C13.3309 3.01727 13.3805 3.16634 13.4374 3.33745L13.5304 3.61654C13.5461 3.66378 13.5506 3.67715 13.5545 3.68768C13.7004 4.09111 14.0787 4.36383 14.5076 4.3747C14.5189 4.37498 14.5327 4.37503 14.5828 4.37503H17.0828C17.4279 4.37503 17.7078 4.65485 17.7078 5.00003C17.7078 5.34521 17.4279 5.62503 17.0828 5.62503H2.91602C2.57084 5.62503 2.29102 5.34521 2.29102 5.00003C2.29102 4.65485 2.57084 4.37503 2.91602 4.37503H5.41609C5.46612 4.37503 5.47993 4.37498 5.49121 4.3747C5.92009 4.36383 6.29844 4.09113 6.44437 3.6877C6.44821 3.67709 6.45262 3.66401 6.46844 3.61654L6.56145 3.33747C6.61836 3.16637 6.66795 3.01728 6.73734 2.88403C7.01146 2.35762 7.51862 1.99208 8.1047 1.89849C8.25305 1.8748 8.41016 1.8749 8.59048 1.87502ZM7.50614 4.37503C7.54907 4.29085 7.5871 4.20337 7.61983 4.1129C7.62977 4.08543 7.63951 4.05619 7.65203 4.01861L7.7352 3.7691C7.81118 3.54118 7.82867 3.49469 7.84602 3.46137C7.9374 3.2859 8.10645 3.16405 8.30181 3.13285C8.33892 3.12693 8.38854 3.12503 8.6288 3.12503H11.37C11.6103 3.12503 11.6599 3.12693 11.697 3.13285C11.8924 3.16405 12.0614 3.2859 12.1528 3.46137C12.1702 3.49469 12.1877 3.54117 12.2636 3.7691L12.3468 4.01846L12.379 4.11292C12.4117 4.20338 12.4498 4.29085 12.4927 4.37503H7.50614Z"
                              fill=""
                            />
                            <path
                              d="M4.92859 7.04179C4.90563 6.69738 4.60781 6.43679 4.2634 6.45975C3.91899 6.48271 3.6584 6.78053 3.68136 7.12494L4.06757 12.9181C4.13881 13.987 4.19636 14.8505 4.33134 15.528C4.47167 16.2324 4.71036 16.8208 5.20335 17.2821C5.69635 17.7433 6.2993 17.9423 7.01151 18.0355C7.69653 18.1251 8.56189 18.125 9.63318 18.125H10.3656C11.4369 18.125 12.3023 18.1251 12.9873 18.0355C13.6995 17.9423 14.3025 17.7433 14.7955 17.2821C15.2885 16.8208 15.5272 16.2324 15.6675 15.528C15.8025 14.8505 15.86 13.987 15.9313 12.9181L16.3175 7.12494C16.3404 6.78053 16.0798 6.48271 15.7354 6.45975C15.391 6.43679 15.0932 6.69738 15.0702 7.04179L14.687 12.7911C14.6121 13.9143 14.5587 14.6958 14.4416 15.2838C14.328 15.8542 14.1693 16.1561 13.9415 16.3692C13.7137 16.5824 13.4019 16.7206 12.8252 16.796C12.2307 16.8738 11.4474 16.875 10.3217 16.875H9.67718C8.55148 16.875 7.76814 16.8738 7.17364 16.796C6.59697 16.7206 6.28518 16.5824 6.05733 16.3692C5.82949 16.1561 5.67088 15.8542 5.55725 15.2838C5.44011 14.6958 5.38675 13.9143 5.31187 12.7911L4.92859 7.04179Z"
                              fill=""
                            />
                            <path
                              d="M7.8539 8.5448C8.19737 8.51045 8.50364 8.76104 8.53799 9.10451L8.95466 13.2712C8.989 13.6146 8.73841 13.9209 8.39495 13.9553C8.05148 13.9896 7.74521 13.739 7.71086 13.3956L7.29419 9.22889C7.25985 8.88542 7.51044 8.57915 7.8539 8.5448Z"
                              fill=""
                            />
                            <path
                              d="M12.1449 8.5448C12.4884 8.57915 12.739 8.88542 12.7047 9.22889L12.288 13.3956C12.2536 13.739 11.9474 13.9896 11.6039 13.9553C11.2604 13.9209 11.0098 13.6146 11.0442 13.2712L11.4609 9.10451C11.4952 8.76104 11.8015 8.51045 12.1449 8.5448Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
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
