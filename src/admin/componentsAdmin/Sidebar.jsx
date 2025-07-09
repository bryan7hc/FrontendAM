import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaCar,
  FaChartBar,
  FaSignOutAlt,
  FaBuilding,
  FaUserCircle,
  FaStar,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/");
  };

  return (
    <div className="w-60 bg-red-600 text-white flex flex-col justify-between p-4 fixed h-full">
      <div>
        <div className="text-center font-bold text-2xl mb-4">AutoMundo</div>

        {/* ✅ Mostrar datos del admin si está logueado */}
        {usuario?.rol === "admin" && (
          <div className="text-center mb-6">
            <FaUserCircle className="text-3xl mx-auto mb-1" />
            <p className="text-sm">Admin: {usuario.nombre}</p>
          </div>
        )}

        <SidebarButton
          icon={<FaUsers />}
          label="Usuarios"
          to="/admin/usuarios"
        />
        <SidebarButton
          icon={<FaCar />}
          label="Vehículos"
          to="/admin/vehiculos"
        />
        <SidebarButton
          icon={<FaBuilding />}
          label="Proveedores"
          to="/admin/proveedores"
        />
        <SidebarButton
          icon={<FaChartBar />}
          label="Reportes"
          to="/admin/reporte-ventas"
        />
        <SidebarButton icon={<FaStar />} label="Reseñas" to="/admin/resenas" />
      
        <SidebarButton
        icon={<FaChartBar />}
        label="Dashboard"
        to="/admin/dashboard"
      />
      </div>

      

      {/* ✅ Mostrar botón de cerrar sesión solo si está logueado como admin */}
      {usuario?.rol === "admin" && (
        <button
          onClick={cerrarSesion}
          className="flex items-center gap-2 px-4 py-2 mt-8 bg-red-700 hover:bg-red-800 rounded text-sm"
        >
          <FaSignOutAlt />
          Cerrar Sesión
        </button>
      )}
    </div>
  );
};

const SidebarButton = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 px-4 py-2 mb-2 bg-red-500 hover:bg-red-700 rounded w-full text-left"
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default Sidebar;
