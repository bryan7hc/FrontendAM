import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DatosCompra = () => {
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

  const [metodoPago, setMetodoPago] = useState("mercado_pago");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePago = async () => {
    if (Object.values(form).some((campo) => campo.trim() === "")) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!vehiculo) {
      alert("No se encontró información del vehículo.");
      return;
    }

    if (metodoPago !== "mercado_pago") {
      alert("Este método de pago está en desarrollo.");
      return;
    }

    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario) {
        alert("Debes iniciar sesión para continuar con la compra.");
        return;
      }

      // URL dinámica para la API
      const API_URL = process.env.REACT_APP_API_URL;

      // 1. Actualizar en la BD los datos adicionales del usuario
      await axios.put(
        `${API_URL}/api/usuarios/actualizar-datos-compra`,
        {
          usuario_id: usuario.usuario_id,
          direccion: form.direccion,
          ciudad: form.ciudad,
          dni: form.dni,
          metodo_pago: metodoPago,
        }
      );

      // 2. Guardar localmente (opcional, por sincronía visual)
      const datosActualizados = {
        ...usuario,
        direccion: form.direccion,
        ciudad: form.ciudad,
        dni: form.dni,
        metodo_pago: metodoPago,
      };
      localStorage.setItem("usuario", JSON.stringify(datosActualizados));

      // 3. Preparar el comprador y redirigir al pago
      const comprador = {
        ...form,
        usuario_id: usuario.usuario_id,
      };

      const res = await axios.post(
        `${API_URL}/api/pago/crear-preferencia`,
        {
          vehiculo,
          comprador,
        }
      );

      window.location.href = res.data.init_point;
    } catch (err) {
      console.error("Error en el proceso de compra:", err);
      alert("Hubo un error al procesar el pago.");
    }
  };

  if (!vehiculo) {
    return (
      <p className="mt-32 text-center text-lg text-gray-600">
        No se recibió información del vehículo.
      </p>
    );
  }

  return (
    <div className="mt-28 px-4 max-w-6xl mx-auto pb-24">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Finalizar compra
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario de datos */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-3">
            Información del comprador
          </h2>

          {[ 
            { label: "Nombre completo", name: "nombre" },
            { label: "Correo electrónico", name: "correo" },
            { label: "Teléfono", name: "telefono" },
            { label: "Dirección", name: "direccion" },
            { label: "Ciudad", name: "ciudad" },
            { label: "DNI o RUC", name: "dni" }
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm text-gray-600 mb-1">
                {label}
              </label>
              <input
                type="text"
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
            </div>
          ))}

          {/* Métodos de pago */}
          <div className="pt-2 border-t">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Métodos de pago
            </h3>
            <div className="grid gap-3">
              {[ 
                { value: "mercado_pago", label: "Mercado Pago (activo)" },
                { value: "yape", label: "Yape (simulado)" },
                { value: "plin", label: "Plin (simulado)" },
                { value: "tarjeta", label: "Tarjeta de crédito (simulado)" },
                { value: "transferencia", label: "Transferencia bancaria (simulado)" }
              ].map((m) => (
                <label
                  key={m.value}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition"
                >
                  <input
                    type="radio"
                    name="metodo_pago"
                    value={m.value}
                    checked={metodoPago === m.value}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className="accent-gray-800"
                  />
                  <span className="text-gray-700 text-sm">{m.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handlePago}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2.5 rounded-md transition duration-200"
          >
            Pagar ahora
          </button>
        </div>

        {/* Resumen de vehículo */}
        <div className="bg-gray-50 rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-3">
            Detalles del pedido
          </h2>
          <div className="flex items-center gap-4">
            <img
              src={vehiculo.imagen || "/default-car.jpg"}
              alt={vehiculo.nombre}
              className="w-32 h-20 object-cover rounded-md shadow"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {vehiculo.nombre}
              </h3>
              <p className="text-sm text-gray-500">{vehiculo.marca}</p>
            </div>
          </div>
          <div className="text-gray-700">
            <p>
              <span className="font-medium">Precio:</span> S/.{" "}
              {Number(vehiculo.precio).toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Stock:</span> {vehiculo.stock}
            </p>
            <p>
              <span className="font-medium">Color:</span>{" "}
              {vehiculo.color || "No especificado"}
            </p>
            <p>
              <span className="font-medium">Año:</span>{" "}
              {vehiculo.anio || "No disponible"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosCompra;
