import React, { useEffect, useState } from "react";
import axios from "axios";

const Reseñas = ({ vehiculoId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const obtenerReseñas = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/vehiculos/${vehiculoId}/resenas`
      );
      setComentarios(res.data);
    } catch (error) {
      console.error("Error al obtener reseñas:", error);
    }
  };

  const enviarReseña = async () => {
    if (!nuevoComentario.trim() || calificacion === 0) return;

    try {
      await axios.post(
        `http://localhost:3000/api/vehiculos/${vehiculoId}/resenas`,
        {
          usuario_id: usuario.usuario_id,
          comentario: nuevoComentario,
          calificacion,
        }
      );
      setNuevoComentario("");
      setCalificacion(0);
      obtenerReseñas();
    } catch (error) {
      console.error("Error al enviar reseña:", error);
    }
  };

  const renderEstrellas = (cantidad) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-sm ${
            index < cantidad ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  const renderEstrellasSeleccionables = () => (
    <div className="flex space-x-1 mb-2">
      {[1, 2, 3, 4, 5].map((estrella) => (
        <button
          key={estrella}
          type="button"
          onClick={() => setCalificacion(estrella)}
          className={`text-base ${
            calificacion >= estrella ? "text-yellow-400" : "text-gray-300"
          } hover:scale-105 transition`}
        >
          ★
        </button>
      ))}
    </div>
  );

  useEffect(() => {
    obtenerReseñas();
  }, []);

  return (
    <div className="mt-16">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
        Reseñas
      </h2>

      {/* Reseñas existentes */}
      {comentarios.length === 0 ? (
        <p className="text-gray-600 text-sm">Este vehículo aún no tiene reseñas.</p>
      ) : (
        <div className="space-y-3">
          {comentarios.map((comentario) => (
            <div
              key={comentario.reseña_id}
              className="bg-gray-50 border border-gray-200 rounded-md p-3"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {comentario.nombre}
                </span>
                {renderEstrellas(comentario.calificacion)}
              </div>
              <p className="text-sm text-gray-700">{comentario.comentario}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(comentario.fecha).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Formulario para nueva reseña */}
      {usuario ? (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-800 mb-1">Deja tu reseña</h3>
          {renderEstrellasSeleccionables()}
          <textarea
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            rows={2}
            placeholder="Escribe tu comentario..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-gray-700 focus:outline-none"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={enviarReseña}
              className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2 rounded-md transition duration-200"
            >
              Enviar
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          Inicia sesión para dejar una reseña.
        </p>
      )}
    </div>
  );
};

export default Reseñas;
