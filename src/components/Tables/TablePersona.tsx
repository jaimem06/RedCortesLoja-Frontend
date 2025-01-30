import { useRouter } from "next/navigation";
import { modificar_estado, listar_usuarios, eliminar_usuario } from "@/hooks/servicio_persona";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

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

  // Función para redireccionar a editar usuario
  function boton_click(external: string): void {
    ruta.push("admin-usuario/" + external);
  }

  // Función para redireccionar a registrar usuario
  function registrar_usuario() {
    ruta.push("admin-usuario/nuevo");
  }

  // Función para cambiar el estado de la cuenta del usuario
  function cambiar_estado(external: string, estado: boolean) {
    if (estado === true) {
      swal({
        title: "¿Está seguro de desactivar la cuenta?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        buttons: {
          cancel: {
            text: "Cancelar",
            value: false,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Aceptar",
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
          console.log("Valor de external_id antes de llamar a modificar_estado:", external);
          modificar_estado(external).then((res) => {
            console.log("Respuesta de modificar estado:", res);
  
            // Verificamos si 'res' y 'res.datos' existen antes de acceder a 'error'
            if (res && res.code === 200 && res.data) {
              obtener_usuarios();
              swal({
                title: "Éxito",
                text: res.data.tag || "Operación exitosa",
                icon: "success",
                button: "Aceptar",
              });
              cerrar_sesion(external);
            } else {
              // Si 'res.datos' no está definido, mostramos un mensaje de error general
              console.log("Error en la respuesta de modificar_estado:", res);
              swal({
                title: "Error",
                text: res && res.datos ? res.datos.error : "Error desconocido", // Validamos si 'datos' está definido
                icon: "error",
                button: "Aceptar",
              });
            }
          }).catch(error => {
            // Captura cualquier error en la llamada a modificar_estado
            console.error("Error en la llamada a modificar_estado:", error);
            swal({
              title: "Error",
              text: "Hubo un problema al realizar la operación.",
              icon: "error",
              button: "Aceptar",
            });
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
            text: "Cancelar",
            value: false,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Aceptar",
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
            console.log("Respuesta de modificar estado:", res);
  
            if (res && res.code === 200 && res.data) {
              obtener_usuarios();
              swal({
                title: "Éxito",
                text: res.data.tag || "Operación exitosa",
                icon: "success",
                button: "Aceptar",
              });
            } else {
              swal({
                title: "Error",
                text: res && res.datos ? res.datos.error : "Error desconocido", // Validamos res.datos
                icon: "error",
                button: "Aceptar",
              });
            }
          }).catch(error => {
            console.error("Error en la llamada a modificar_estado:", error);
            swal({
              title: "Error",
              text: "Hubo un problema al realizar la operación.",
              icon: "error",
              button: "Aceptar",
            });
          });
        }
      });
    }
  }
  
  


  // Función para eliminar usuario
  function eliminar(external: string) {
    swal({
      title: "¿Está seguro de eliminar este usuario?",
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
        eliminar_usuario(external).then((res) => {
          if (res && res.code === 200) {
            obtener_usuarios();
            swal({
              title: "Exito",
              text: "Usuario eliminado correctamente.",
              icon: "success",
              button: "Aceptar",
            });
          } else {
            swal({
              title: "Error",
              text: res.datos ? res.datos.error : "Error desconocido",
              icon: "error",
              button: "Aceptar",
            });
          }
        });
      }
    });
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
              fill=""/>
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

                    <td
                      className={`border-[#eee] px-4 py-4 text-right dark:border-dark-3 xl:pr-7.5 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => boton_click(persona.external)}
                          className="text-primary hover:text-blue-500 dark:text-white dark:hover:text-gray-300"
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button
                          onClick={() => eliminar(persona.external)}
                          className="text-danger hover:text-red-500 dark:text-white dark:hover:text-gray-300"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          onClick={() => cambiar_estado(persona.external, persona.estado)}
                          className={`text-${persona.estado ? "danger" : "success"} hover:text-${persona.estado ? "red" : "green"}-500`}
                        >
                          <FontAwesomeIcon icon={persona.estado ? faLock : faLockOpen} />
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
