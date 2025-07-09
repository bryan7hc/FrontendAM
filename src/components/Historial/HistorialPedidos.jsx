import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaCarSide,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL; // Utilizar la variable de entorno para la URL del backend

  useEffect(() => {
    const fetchPedidos = async () => {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario) return;

      try {
        const res = await axios.get(
          `${API_URL}/api/pedidos/usuario/${usuario.usuario_id}`
        );
        setPedidos(res.data);
      } catch (error) {
        console.error("❌ Error al obtener historial:", error);
      }
    };

    fetchPedidos();
  }, [API_URL]);

  return (
    <div className="mt-38 px-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
        Historial de Pedidos
      </h2>

      {pedidos.length === 0 ? (
        <p className="text-center text-gray-500">No hay pedidos registrados.</p>
      ) : (
        <div className="space-y-5">
          {pedidos.map((pedido) => (
            <div
              key={pedido.pedido_id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-gray-700 text-sm">
                  <div className="flex items-center gap-2">
                    <FaCarSide className="text-gray-800" />
                    <span>
                      <strong className="text-gray-800">Vehículo:</strong>{" "}
                      {pedido.vehiculo}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-800" />
                    <span>
                      <strong className="text-gray-800">Fecha:</strong>{" "}
                      {new Date(pedido.fecha_pedido).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-gray-800" />
                    <span>
                      <strong className="text-gray-800">Total:</strong> S/.{" "}
                      {Number(pedido.total).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-gray-800" />
                    <span>
                      <strong className="text-gray-800">Estado:</strong>{" "}
                      {pedido.estado}
                    </span>
                  </div>
                </div>

                {/* Botón alineado a la derecha */}
                <div className="flex items-end justify-end">
                  <a
                    href={`${API_URL}/api/comprobantes/${pedido.pedido_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-5 py-2.5 rounded-md transition duration-200"
                  >
                    Ver comprobante
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorialPedidos;
