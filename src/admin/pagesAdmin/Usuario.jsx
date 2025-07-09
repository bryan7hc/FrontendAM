import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../componentsAdmin/Sidebar";

export default function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Cambiar a la URL de tu backend en Azure
  const API_URL =
    "https://automundo-aqarbhcmbteegrcv.canadacentral-01.azurewebsites.net/api/admin/usuarios";

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const abrirModal = (usuario) => {
    setUsuarioSeleccionado({ ...usuario });
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setUsuarioSeleccionado(null);
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      const { usuario_id, nombre, correo, telefono, contraseña } =
        usuarioSeleccionado;

      // Cambiar a la URL de tu backend en Azure
      await axios.put(
        `https://automundo-aqarbhcmbteegrcv.canadacentral-01.azurewebsites.net/api/admin/usuarios/${usuario_id}`,
        { nombre, correo, telefono, contraseña }
      );

      obtenerUsuarios();
      cerrarModal();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      // Cambiar a la URL de tu backend en Azure
      await axios.put(
        `https://automundo-aqarbhcmbteegrcv.canadacentral-01.azurewebsites.net/api/admin/usuarios/${id}/eliminar`
      );
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="ml-60 flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 bg-white shadow-md rounded text-sm">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-2 px-3 border">ID</th>
                <th className="py-2 px-3 border">Nombre</th>
                <th className="py-2 px-3 border">Correo</th>
                <th className="py-2 px-3 border">Teléfono</th>
                <th className="py-2 px-3 border">Contraseña</th>
                <th className="py-2 px-3 border">Fecha de Registro</th>
                <th className="py-2 px-3 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr
                  key={usuario.usuario_id}
                  className="hover:bg-gray-100 text-center"
                >
                  <td className="py-2 px-3 border">{usuario.usuario_id}</td>
                  <td className="py-2 px-3 border">{usuario.nombre}</td>
                  <td className="py-2 px-3 border">{usuario.correo}</td>
                  <td className="py-2 px-3 border">{usuario.telefono}</td>
                  <td className="py-2 px-3 border">{usuario.contraseña}</td>
                  <td className="py-2 px-3 border">
                    {new Date(usuario.fecha_registro).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3 border flex justify-center gap-2">
                    <button
                      onClick={() => abrirModal(usuario)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarUsuario(usuario.usuario_id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarModal && usuarioSeleccionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] max-w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>
            <form onSubmit={guardarCambios} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Nombre</label>
                <input
                  type="text"
                  value={usuarioSeleccionado.nombre}
                  onChange={(e) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      nombre: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Correo</label>
                <input
                  type="email"
                  value={usuarioSeleccionado.correo}
                  onChange={(e) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      correo: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Teléfono</label>
                <input
                  type="text"
                  value={usuarioSeleccionado.telefono}
                  onChange={(e) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      telefono: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Contraseña</label>
                <input
                  type="password"
                  value={usuarioSeleccionado.contraseña}
                  onChange={(e) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      contraseña: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
