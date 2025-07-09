import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../componentsAdmin/Sidebar";

export default function Vehiculo() {
  const [vehiculos, setVehiculos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    categoria: "camioneta",
    stock: "",
    marca_id: "",
    descripcion: "",
    imagen: "",
  });
  const [editando, setEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const API_URL = "https://automundo-aqarbhcmbteegrcv.canadacentral-01.azurewebsites.net/api/admin/vehiculos"; // Cambia a tu URL de Azure

  useEffect(() => {
    obtenerVehiculos();
  }, []);

  const obtenerVehiculos = async () => {
    try {
      const res = await axios.get(API_URL);
      setVehiculos(res.data);
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? parseInt(value) || "" : value,
    });
  };

  const abrirModal = (vehiculo = null) => {
    if (vehiculo) {
      setForm(vehiculo);
      setEditando(vehiculo.vehiculo_id);
    } else {
      setForm({
        nombre: "",
        precio: "",
        categoria: "camioneta",
        stock: "",
        marca_id: "",
        descripcion: "",
        imagen: "",
      });
      setEditando(null);
    }
    setMostrarModal(true);
  };

  const cerrarModal = () => setMostrarModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(`${API_URL}/${editando}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      obtenerVehiculos();
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar vehículo:", error);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro que deseas eliminar este vehículo?"))
      return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      obtenerVehiculos(); // Refrescar lista
    } catch (error) {
      console.error("Error al eliminar vehículo:", error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="ml-60 w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestión de Vehículos</h1>
          <button
            onClick={() => abrirModal()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Registrar Vehículo
          </button>
        </div>

        {/* Tabla de vehículos */}
        <div className="overflow-x-auto bg-white rounded-lg shadow bg-transparent">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Marca</th>
                <th className="p-3">Imagen</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.length > 0 ? (
                vehiculos.map((v) => (
                  <tr
                    key={v.vehiculo_id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="p-2">{v.vehiculo_id}</td>
                    <td className="p-2">{v.nombre}</td>
                    <td className="p-2">${v.precio}</td>
                    <td className="p-2 capitalize">{v.categoria}</td>
                    <td className="p-2">{v.stock}</td>
                    <td className="p-2">{v.nombre_marca}</td>
                    <td className="p-2">
                      <img
                        src={v.imagen}
                        alt="vehiculo"
                        className="w-16 h-16 object-cover rounded mx-auto"
                      />
                    </td>
                    <td className="p-2 flex justify-center gap-2">
                      <button
                        onClick={() => abrirModal(v)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(v.vehiculo_id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No hay vehículos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {mostrarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl shadow-lg relative">
              <button
                onClick={cerrarModal}
                className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-4">
                {editando ? "Editar" : "Registrar"} Vehículo
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4 text-sm"
              >
                {[{ name: "nombre", placeholder: "Nombre" }, { name: "precio", type: "number", placeholder: "Precio" }, { name: "stock", type: "number", placeholder: "Stock" }, { name: "modelo", placeholder: "Modelo" }, { name: "color", placeholder: "Color" }, { name: "motor", placeholder: "Motor" }, { name: "transmision", placeholder: "Transmisión" }, { name: "kilometraje", type: "number", placeholder: "Kilometraje" }, { name: "combustible", placeholder: "Combustible" }, { name: "puertas", type: "number", placeholder: "N° de puertas" }, { name: "asientos", type: "number", placeholder: "N° de asientos" }, { name: "condicion", placeholder: "Condición" }, { name: "garantia", placeholder: "Garantía" }, { name: "ubicacion", placeholder: "Ubicación" }].map(({ name, placeholder, type = "text" }) => (
                  <input
                    key={name}
                    type={type}
                    name={name}
                    value={form[name] || ""}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="border rounded px-3 py-2"
                  />
                ))}

                {/* Categoria */}
                <select
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                >
                  <option value="camioneta">Camioneta</option>
                  <option value="electrico">Eléctrico</option>
                  <option value="deportivo">Deportivo</option>
                </select>

                {/* Marca */}
                <input
                  type="text"
                  name="marca_id"
                  value={form.marca_id}
                  onChange={handleChange}
                  placeholder="ID Marca"
                  className="border rounded px-3 py-2"
                />

                {/* Imagen */}
                <input
                  type="text"
                  name="imagen"
                  value={form.imagen}
                  onChange={handleChange}
                  placeholder="URL de la imagen"
                  className="border rounded px-3 py-2 col-span-2"
                />

                {/* Descripción */}
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción"
                  rows="3"
                  className="border rounded px-3 py-2 col-span-2"
                />

                {/* Destacado */}
                <label className="col-span-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="destacado"
                    checked={form.destacado === 1 || form.destacado === true}
                    onChange={(e) =>
                      setForm({ ...form, destacado: e.target.checked ? 1 : 0 })
                    }
                  />
                  ¿Vehículo destacado?
                </label>

                <button
                  type="submit"
                  className="col-span-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  {editando ? "Actualizar" : "Registrar"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
