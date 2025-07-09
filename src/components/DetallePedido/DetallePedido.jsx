import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetallePedido = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState("");
  const [descargando, setDescargando] = useState(false);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pedidos/${id}`
        );
        setPedido(response.data);
      } catch (err) {
        console.error("Error al obtener el pedido:", err);
        setError("No se pudo obtener la información del pedido.");
      }
    };
    fetchDetalle();
  }, [id]);

  const descargarComprobante = async () => {
    try {
      setDescargando(true);
      const response = await axios.get(
        `http://localhost:3000/api/pedidos/${id}/comprobante`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `comprobante_pedido_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Error al descargar comprobante:", err);
      alert("No se pudo descargar el comprobante.");
    } finally {
      setDescargando(false);
    }
  };

  const cancelarPedido = async () => {
    try {
      await axios.post(`http://localhost:3000/api/pedidos/${id}/cancelar`);
      alert("Pedido cancelado exitosamente.");
      window.location.reload();
    } catch (err) {
      console.error("Error al cancelar pedido:", err);
      alert("No se pudo cancelar el pedido.");
    }
  };

  if (error) return <p className="pt-24 text-center text-red-600">{error}</p>;
  if (!pedido) return <p className="pt-24 text-center">Cargando detalles...</p>;

  return (
    <main className="pt-24 px-6">
      <h1 className="text-2xl font-bold mb-4">
        Detalle del Pedido #{pedido.id}
      </h1>
      <p>Fecha: {new Date(pedido.fecha).toLocaleDateString()}</p>
      <p>Estado: {pedido.estado}</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Productos:</h2>
      <ul className="list-disc list-inside">
        {pedido.items.map((item, index) => (
          <li key={index}>
            {item.nombre} - S/. {item.precio} x {item.cantidad}
          </li>
        ))}
      </ul>

      <div className="mt-6 space-x-4">
        <button
          onClick={descargarComprobante}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {descargando ? "Descargando..." : "Descargar Comprobante"}
        </button>

        {pedido.estado === "Pendiente" && (
          <button
            onClick={cancelarPedido}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cancelar Pedido
          </button>
        )}
      </div>
    </main>
  );
};

export default DetallePedido;
