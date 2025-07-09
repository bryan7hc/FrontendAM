import React, { useEffect, useState } from "react";
import axios from "axios";

const Perfil = () => {
  const usuarioLS = JSON.parse(localStorage.getItem("usuario"));
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [formData, setFormData] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const fetchDatosUsuario = async () => {
      try {
        if (usuarioLS?.usuario_id) {
          const res = await axios.get(
            `http://localhost:3000/api/usuarios/${usuarioLS.usuario_id}`
          );
          setUsuario(res.data);
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatosUsuario();
  }, [usuarioLS]);

  const handleEditarPerfil = () => {
    setFormData({
      correo: usuario.correo,
      telefono: usuario.telefono || "",
      direccion: usuario.direccion || "",
      ciudad: usuario.ciudad || "",
    });
    setModoEdicion(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardarPerfil = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/usuarios/${usuarioLS.usuario_id}`,
        formData
      );
      setUsuario({ ...usuario, ...formData });
      setModoEdicion(false);
    } catch (error) {
      console.error("❌ Error al actualizar perfil:", error);
      alert("Error al actualizar el perfil.");
    }
  };

  if (!usuarioLS) {
    return (
      <div className="min-h-screen pt-32 text-center text-gray-600 text-lg">
        No se ha iniciado sesión.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 text-center text-gray-600 text-lg">
        Cargando datos del perfil...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-4 bg-gray-100 mt-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Encabezado */}
        <div className="flex items-center gap-6 border-b pb-6">
          <div className="bg-gray-800 text-white rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold shadow-md">
            {usuario?.nombre?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {usuario?.nombre}
            </h1>
            <p className="text-sm text-gray-500 mt-1 capitalize font-medium">
              {usuario?.rol}
            </p>
          </div>
        </div>

        {/* Información personal */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Nombre completo" value={usuario?.nombre} />
          {modoEdicion ? (
            <CampoEditable
              label="Correo electrónico"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
            />
          ) : (
            <Info label="Correo electrónico" value={usuario?.correo} />
          )}
          {modoEdicion ? (
            <CampoEditable
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
            />
          ) : (
            <Info
              label="Teléfono"
              value={usuario?.telefono || "No registrado"}
            />
          )}
          <Info
            label="Fecha de registro"
            value={usuario?.fecha_registro?.split("T")[0] || "No disponible"}
          />
        </div>

        {/* Información adicional */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
            Información adicional
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modoEdicion ? (
              <CampoEditable
                label="Dirección registrada"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
              />
            ) : (
              <Info
                label="Dirección registrada"
                value={usuario?.direccion || "No registrada"}
              />
            )}
            {modoEdicion ? (
              <CampoEditable
                label="Ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
              />
            ) : (
              <Info label="Ciudad" value={usuario?.ciudad || "No registrada"} />
            )}
            <Info label="DNI o RUC" value={usuario?.dni || "No registrado"} />
            <Info
              label="Método de pago preferido"
              value={usuario?.metodo_pago || "No registrado"}
            />
          </div>
        </div>

        {/* Preferencias simuladas */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
            Preferencias de contacto
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600 text-sm">
            <li>Recibir ofertas por correo electrónico</li>
            <li>Notificaciones de pedido por WhatsApp</li>
            <li>Promociones exclusivas para miembros</li>
          </ul>
        </div>

        {/* Botones */}
        <div className="mt-10 flex justify-end gap-4">
          {modoEdicion ? (
            <>
              <button
                className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleGuardarPerfil}
              >
                Guardar
              </button>
              <button
                className="px-5 py-2 border border-gray-400 text-gray-800 rounded hover:bg-gray-100"
                onClick={() => setModoEdicion(false)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded"
                onClick={handleEditarPerfil}
              >
                Editar perfil
              </button>
              <button
                className="px-5 py-2 border border-gray-400 text-gray-800 rounded hover:bg-gray-100"
                onClick={() => setMostrarModal(true)}
              >
                Cambiar contraseña
              </button>
            </>
          )}
        </div>
      </div>

      <ModalCambiarContrasena
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        usuarioId={usuarioLS.usuario_id}
      />
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-base font-medium text-gray-800">{value}</span>
  </div>
);

const CampoEditable = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-500 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded px-3 py-2 text-gray-800"
    />
  </div>
);

const ModalCambiarContrasena = ({ visible, onClose, usuarioId }) => {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const handleGuardar = async () => {
    setMensaje(null);
    if (!actual || !nueva || !confirmar) {
      setMensaje("⚠️ Todos los campos son obligatorios.");
      return;
    }
    if (nueva !== confirmar) {
      setMensaje("⚠️ La nueva contraseña no coincide con la confirmación.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/usuarios/${usuarioId}/cambiar-contrasena`,
        { actual, nueva }
      );
      setMensaje("✅ Contraseña actualizada correctamente.");
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error("❌ Error al cambiar contraseña:", error);
      setMensaje(
        error.response?.data?.error || "❌ Error al cambiar la contraseña."
      );
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Cambiar contraseña
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Contraseña actual"
            value={actual}
            onChange={(e) => setActual(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        {mensaje && (
          <p className="mt-3 text-sm text-center text-red-600">{mensaje}</p>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleGuardar}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
