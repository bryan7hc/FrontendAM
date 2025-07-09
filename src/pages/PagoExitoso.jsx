import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PagoExitoso = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("Procesando...");

  const estado = searchParams.get("estado");
  const userId = searchParams.get("userId");
  const vehiculoId = searchParams.get("vehiculoId");
  const cantidad = searchParams.get("cantidad");

  useEffect(() => {
    // Validamos el estado y otros parámetros
    if (estado === "confirmado" && userId && vehiculoId && cantidad) {
      setMensaje("✅ ¡Gracias por tu compra! El pago fue aprobado.");
    } else {
      setMensaje("❌ Hubo un problema al procesar tu compra.");
    }
  }, [estado, userId, vehiculoId, cantidad]);

  return (
    <div className="mt-28 text-center">
      <h1 className="text-2xl font-bold mb-4">Resultado del Pago</h1>
      <p className="text-gray-700">{mensaje}</p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default PagoExitoso;
