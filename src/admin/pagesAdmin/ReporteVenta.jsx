import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ReporteVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const API_URL = "https://automundo-aqarbhcmbteegrcv.canadacentral-01.azurewebsites.net/api/reportes/ventas"; // Cambia a tu URL de Azure

  const fetchVentas = async () => {
    try {
      const res = await axios.get(API_URL, {
        params: {
          fechaInicio: fechaInicio || undefined,
          fechaFin: fechaFin || undefined,
        },
      });
      setVentas(res.data);
    } catch (error) {
      console.error("Error al obtener reporte:", error);
    }
  };

  useEffect(() => {
    fetchVentas(); // Carga inicial sin filtro
  }, []);

  const exportarExcel = () => {
    if (ventas.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(ventas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ReporteVentas");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const archivo = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(archivo, `Reporte_Ventas_${fechaInicio || "inicio"}_a_${fechaFin || "hoy"}.xlsx`);
  };

  return (
    <div className="ml-100 mt-24 p-6 max-w-6xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Reporte de Ventas</h2>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div>
          <label className="block text-sm font-medium">Fecha inicio:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Fecha fin:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={fetchVentas}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Filtrar
        </button>
        <button
          onClick={exportarExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar Excel
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200 text-sm">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Cliente</th>
              <th className="p-2 border">Vehículo</th>
              <th className="p-2 border">Total (S/.)</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No hay registros de ventas en el rango seleccionado.
                </td>
              </tr>
            ) : (
              ventas.map((venta) => (
                <tr key={venta.pedido_id}>
                  <td className="p-2 border">{venta.pedido_id}</td>
                  <td className="p-2 border">{venta.cliente}</td>
                  <td className="p-2 border">{venta.vehiculo}</td>
                  <td className="p-2 border">
                    {isNaN(Number(venta.total))
                      ? "—"
                      : Number(venta.total).toFixed(2)}
                  </td>
                  <td className="p-2 border">{venta.estado}</td>
                  <td className="p-2 border">
                    {new Date(venta.fecha_pedido).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReporteVentas;
