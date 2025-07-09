import React, { useEffect, useState } from "react";
import axios from "axios";

const Proveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState({
    razon_social: "",
    ruc: "",
    correo: "",
    telefono: "",
  });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    obtenerProveedores();
  }, []);

  const obtenerProveedores = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/proveedores");
      setProveedores(res.data);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.razon_social || !form.ruc || !form.correo)
      return alert("Campos requeridos");

    try {
      if (editando !== null) {
        await axios.put(
          `http://localhost:3000/api/proveedores/${editando}`,
          form
        );
      } else {
        await axios.post("http://localhost:3000/api/proveedores", form);
      }

      obtenerProveedores();
      setForm({ razon_social: "", ruc: "", correo: "", telefono: "" });
      setEditando(null);
    } catch (error) {
      console.error("Error al guardar proveedor:", error);
    }
  };

  const handleEditar = (proveedor) => {
    setForm(proveedor);
    setEditando(proveedor.proveedor_id);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este proveedor?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/proveedores/${id}`);
      obtenerProveedores();
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
    }
  };

  return (
    <div className="pl-64 pt-28 px-6 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Gestión de Proveedores
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg mb-10 max-w-2xl"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {editando ? "Editar" : "Registrar"} Proveedor
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Razón Social
            </label>
            <input
              type="text"
              name="razon_social"
              value={form.razon_social}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              RUC
            </label>
            <input
              type="text"
              name="ruc"
              value={form.ruc}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Correo
            </label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
        </div>

        <button className="mt-6 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
          {editando ? "Actualizar" : "Registrar"}
        </button>
      </form>

      {/* Tabla */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Razón Social</th>
              <th className="p-3 text-left">RUC</th>
              <th className="p-3 text-left">Correo</th>
              <th className="p-3 text-left">Teléfono</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.length > 0 ? (
              proveedores.map((p) => (
                <tr key={p.proveedor_id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{p.proveedor_id}</td>
                  <td className="p-3">{p.razon_social}</td>
                  <td className="p-3">{p.ruc}</td>
                  <td className="p-3">{p.correo}</td>
                  <td className="p-3">{p.telefono || "-"}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleEditar(p)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(p.proveedor_id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No hay proveedores registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Proveedor;
