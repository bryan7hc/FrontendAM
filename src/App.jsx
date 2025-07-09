import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Hero from "./pages/Hero";
import Categories from "./pages/Categories";
import CatalogoPorCategoria from "./pages/CatalogoPorCategoria";
import QuienesSomos from "./pages/QuienesSomos";
import DetailVehicle from "./components/DetailVehicle/DetailVehicle";
import HistorialPedido from "./components/Historial/HistorialPedidos";
import Usuario from "./admin/pagesAdmin/Usuario";
import Vehiculo from "./admin/pagesAdmin/Vehiculo";
import Perfil from "./pages/Perfil";
import Proveedor from "./admin/pagesAdmin/Proveedor";
import ReseñaAdmin from "./admin/pagesAdmin/Reseña";
import Login from "./components/auth/Login";
import ReporteVentas from "./admin/pagesAdmin/ReporteVenta";
import Dashboard from "./admin/pagesAdmin/Dashboard";

import CompraVehiculo from "./pages/CompraVehiculo";
import PagoExitoso from "./pages/PagoExitoso";
import PagoFallido from "./pages/PagoFallido";
import PagoPendiente from "./pages/PagoPendiente";
import DatosCompra from "./pages/DatosCompra";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas para usuario */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoria" element={<CatalogoPorCategoria />} />
          <Route path="/categories/:categoria/:slug" element={<DetailVehicle />} />
          <Route path="/vehiculo/:slug" element={<DetailVehicle />} />
          <Route path="/vehiculo/:categoria/:id" element={<DetailVehicle />} />
          <Route path="/vehiculo/:id" element={<DetailVehicle />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/historial" element={<HistorialPedido />} />
          <Route path="/login" element={<Login />} />
          <Route path="/compra" element={<CompraVehiculo />} />
          <Route path="/pago-exitoso" element={<PagoExitoso />} />
          <Route path="/pago-fallido" element={<PagoFallido />} />
          <Route path="/pago-pendiente" element={<PagoPendiente />} />
          <Route path="/datos-compra" element={<DatosCompra />} />
        </Route>

        {/* Rutas para administrador */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="usuarios" element={<Usuario />} />
          <Route path="vehiculos" element={<Vehiculo />} />
          <Route path="proveedores" element={<Proveedor />} />
          <Route path="resenas" element={<ReseñaAdmin />} />
          <Route path="reporte-ventas" element={<ReporteVentas />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
