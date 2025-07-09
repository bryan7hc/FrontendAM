import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <h3 className="text-lg font-semibold text-gray-600 mb-1">{title}</h3>
    <p className="text-2xl font-bold text-blue-700">{value}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [ventasMensuales, setVentasMensuales] = useState([]);

  const API_URL =
    "https://automundo-aqarbhcmbteegrcv.canadacentral-01.azurewebsites.net/api"; // Cambia a la URL de tu backend en Azure

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/pedidos/resumen-dashboard`);
        setStats(res.data);
        setVentasMensuales(res.data.ventasMensuales || []);
      } catch (error) {
        console.error("Error al cargar estadísticas del dashboard:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="mt-24 p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Dashboard de Administración</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card
          title="Ventas Totales"
          value={`S/ ${Number(stats.totalVentas || 0).toFixed(2)}`}
        />
        <Card
          title="Pedidos Confirmados"
          value={stats.pedidosConfirmados || 0}
        />
        <Card title="Pedidos Pendientes" value={stats.pedidosPendientes || 0} />
        <Card title="Clientes Registrados" value={stats.totalClientes || 0} />
        <Card title="Stock Total Vehículos" value={stats.stockTotal || 0} />
        <Card
          title="Vehículo Más Vendido"
          value={stats.vehiculoMasVendido || "—"}
        />
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Ventas Mensuales del Año
        </h3>
        {ventasMensuales.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={ventasMensuales}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No hay datos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
