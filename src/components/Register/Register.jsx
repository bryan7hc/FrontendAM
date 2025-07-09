import React, { useState } from "react";
import axios from "axios";

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    contraseña: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const camposVacios = Object.values(formData).some((valor) => !valor);
    if (camposVacios) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await axios.post(
        "https://automundo-aqarbhcmbteegrcv.canadacentral-01.azurewebsites.net/api/usuarios/registro",
        formData
      );

      setSuccess(response.data.message || "Usuario registrado correctamente");
      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        contraseña: "",
      });

      setTimeout(() => {
        onSwitchToLogin(); // Cambia a la vista de login después de un registro exitoso
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.error || "Hubo un error al registrar el usuario"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white rounded-lg p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Registro</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            placeholder="tucorreo@ejemplo.com"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Número de contacto"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            name="contraseña"
            type="password"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
      >
        Registrarse
      </button>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

      <p className="text-sm text-center text-gray-600 mt-4">
        ¿Ya tienes una cuenta?{" "}
        <span
          onClick={onSwitchToLogin}
          className="text-blue-600 font-medium cursor-pointer hover:underline"
        >
          Inicia sesión
        </span>
      </p>
    </form>
  );
};

export default Register;
