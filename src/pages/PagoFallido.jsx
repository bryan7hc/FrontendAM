import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const PagoFallido = () => {
  return (
    <div className="mt-32 flex flex-col items-center justify-center px-4 text-center">
      <FaTimesCircle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">Pago fallido</h1>
      <p className="text-gray-600 mt-2">
        Ocurrió un problema al procesar tu pago. Inténtalo nuevamente.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Volver al catálogo
      </Link>
    </div>
  );
};

export default PagoFallido;
