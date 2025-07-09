import React from "react";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";

const PagoPendiente = () => {
  return (
    <div className="mt-32 flex flex-col items-center justify-center px-4 text-center">
      <FaClock className="text-yellow-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">Pago pendiente</h1>
      <p className="text-gray-600 mt-2">
        Tu pago está siendo procesado. Te notificaremos cuando se confirme.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default PagoPendiente;
