import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo2.png";
import Register from "../Register/Register";
import Login from "../auth/Login";

// Enlaces de navegación
const navbarLinks = [
  { id: 1, title: "Inicio", to: "/" },
  { id: 2, title: "Nuestros vehículos", to: "/categories" },
  { id: 3, title: "Quiénes somos", to: "/quienes-somos" },
];

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Verificar si el usuario está guardado en localStorage al cargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) setUsuario(JSON.parse(storedUser));
  }, []);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const closeForms = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-md z-50">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-8 py-3">
          {/* Logo */}
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="w-28 sm:w-32 object-contain"
            />
          </Link>

          {/* Enlaces */}
          <ul className="flex space-x-6 sm:space-x-10 text-sm sm:text-base font-medium text-gray-700">
            {navbarLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.to}
                  className="hover:text-red-600 transition-colors duration-300"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Usuario */}
          <div className="relative" ref={dropdownRef}>
            {!usuario ? (
              <button
                onClick={openLogin}
                className="flex items-center gap-2 text-sm sm:text-base text-gray-700 hover:text-red-600 transition"
              >
                <i className="bi bi-person-circle text-xl sm:text-2xl"></i>
                Iniciar sesión
              </button>
            ) : (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-sm sm:text-base text-gray-700 hover:text-red-600 transition"
              >
                <i className="bi bi-person-check text-xl sm:text-2xl"></i>
                {usuario.nombre}
              </button>
            )}

            {/* Dropdown */}
            {dropdownOpen && usuario && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <Link
                  to="/perfil"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Perfil
                </Link>
                <Link
                  to="/historial"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Historial de pedidos
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Modal de Login / Registro */}
      {(showLogin || showRegister) && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40"
          onClick={closeForms}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {showLogin && (
              <Login
                onLoginSuccess={(user) => setUsuario(user)}
                onSwitchToRegister={openRegister}
                onClose={closeForms}
              />
            )}
            {showRegister && <Register onSwitchToLogin={openLogin} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
