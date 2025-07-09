import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess, onSwitchToRegister, onClose }) => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Solicitud al backend de Azure
      const response = await axios.post(
        "https://automundo-aqarbhcmbteegrcv.canadacentral-01.azurewebsites.net/api/auth/login",
        {
          correo,
          contraseña,
        }
      );

      // Si el login es exitoso
      const usuario = response.data.usuario;

      alert(response.data.mensaje); // Muestra el mensaje del backend
      localStorage.setItem("usuario", JSON.stringify(usuario)); // Guarda el usuario en localStorage
      onLoginSuccess(usuario); // Llama a la función para manejar el éxito del login
      onClose(); // Cierra el modal de login

      // Redirige al usuario según su rol
      if (usuario.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // Página de inicio si es un cliente
      }
    } catch (error) {
      // En caso de error, muestra el mensaje de error
      alert(error.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-6 bg-white rounded-lg p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Iniciar Sesión
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo electrónico
        </label>
        <input
          type="email"
          name="correo"
          placeholder="tucorreo@ejemplo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          type="password"
          name="contraseña"
          placeholder="••••••••"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
      >
        Iniciar sesión
      </button>

      <p className="text-sm text-center text-gray-600">
        ¿No tienes una cuenta?{" "}
        <span
          onClick={onSwitchToRegister}
          className="text-blue-600 cursor-pointer hover:underline font-medium"
        >
          Regístrate aquí
        </span>
      </p>
    </form>
  );
};

export default Login;
