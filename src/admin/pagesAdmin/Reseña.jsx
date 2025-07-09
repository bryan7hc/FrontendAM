import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Reseña = () => {
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerResenas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/resenas");
      setResenas(response.data);
    } catch (error) {
      console.error("Error al cargar reseñas:", error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarResena = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar esta reseña?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3000/api/admin/resenas/${id}`);
      setResenas(resenas.filter((resena) => resena.reseña_id !== id));
    } catch (error) {
      console.error("Error al eliminar reseña:", error);
    }
  };

  useEffect(() => {
    obtenerResenas();
  }, []);

  if (cargando) return <p className="text-center mt-6">Cargando reseñas...</p>;

  return (
    <div className="ml-60 flex-1 p-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Reseñas Registradas</h2>
      {resenas.length === 0 ? (
        <p className="text-gray-600">No hay reseñas registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Usuario</th>
                <th className="px-4 py-2 text-left">Vehículo</th>
                <th className="px-4 py-2 text-left">Comentario</th>
                <th className="px-4 py-2 text-center">Calificación</th>
                <th className="px-4 py-2 text-center">Fecha</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resenas.map((resena) => (
                <tr key={resena.reseña_id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{resena.nombre_usuario}</td>
                  <td className="px-4 py-2">{resena.nombre_vehiculo}</td>
                  <td className="px-4 py-2 max-w-xs truncate">{resena.comentario}</td>
                  <td className="px-4 py-2 text-center">
                    {"★".repeat(resena.calificacion) + "☆".repeat(5 - resena.calificacion)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(resena.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => eliminarResena(resena.reseña_id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reseña;
