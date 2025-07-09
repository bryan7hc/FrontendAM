import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Compra = () => {
  const { state } = useLocation();
  const vehiculo = state?.vehiculo;

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    dni: "",
  });

  const [mostrarPago, setMostrarPago] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinuar = () => {
    // Validaciones básicas
    if (Object.values(form).some((campo) => campo.trim() === "")) {
      alert("Completa todos los campos.");
      return;
    }

    setMostrarPago(true);
  };

  const handleMercadoPago = async () => {
    // Usamos la variable de entorno sin la necesidad de importar "process"
    const API_URL = process.env.REACT_APP_API_URL; // Accedemos directamente a la variable de entorno

    try {
      const res = await axios.post(`${API_URL}/api/pagos/preferencia`, {
        vehiculo,
        comprador: form,
      });

      // Redirige al sandbox o producción de MercadoPago
      window.location.href = res.data.init_point;
    } catch (err) {
      console.error("Error generando preferencia:", err);
    }
  };

  if (!vehiculo) return <p className="mt-32 text-center text-lg">No se recibió información del vehículo.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-28 px-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Información de Compra</h1>

      {!mostrarPago ? (
        <>
          <div className="space-y-4">
            <Input label="Nombre completo" name="nombre" value={form.nombre} onChange={handleChange} />
            <Input label="Correo electrónico" name="correo" value={form.correo} onChange={handleChange} />
            <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
            <Input label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} />
            <Input label="Ciudad" name="ciudad" value={form.ciudad} onChange={handleChange} />
            <Input label="DNI o RUC" name="dni" value={form.dni} onChange={handleChange} />
          </div>

          <button
            className="mt-6 w-full bg-gray-800 text-white py-2.5 rounded hover:bg-gray-700"
            onClick={handleContinuar}
          >
            Continuar
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Selecciona un método de pago</h2>

          <div className="border p-4 rounded bg-white shadow-sm mb-6">
            <p className="mb-2 font-medium text-gray-700">Mercado Pago</p>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={handleMercadoPago}
            >
              Pagar con Mercado Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
    />
  </div>
);

export default Compra;
