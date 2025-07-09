import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PiCarSimpleDuotone,
  PiEngineDuotone,
  PiGasPumpDuotone,
  PiPaletteDuotone,
  PiMapPinDuotone,
  PiDoorDuotone,
  PiChairDuotone,
  PiRoadHorizonDuotone,
  PiCheckCircleDuotone,
  PiShieldCheckDuotone,
  PiWarehouseDuotone,
  PiCalendarDuotone,
  PiSteeringWheelDuotone,
} from "react-icons/pi";
import Reseñas from "../Reseñas/Reseñas";

const DetailVehicle = () => {
  const { slug } = useParams();
  console.log("🧭 Slug recibido por useParams:", slug);
  const [vehiculo, setVehiculo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      console.warn("Slug no definido en URL");
      return;
    }
    axios
      .get(`http://localhost:3000/api/vehiculos/slug/${slug}`)
      .then((res) => {
        setVehiculo(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener el vehículo:", err);
      });
  }, [slug]);

  const handleCompra = () => {
    navigate("/datos-compra", { state: { vehiculo } });
  };

  if (!vehiculo)
    return (
      <p className="text-center mt-32 text-lg text-gray-500 animate-pulse">
        Cargando vehículo...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto mt-32 px-6 pb-20 ">
      {/* Encabezado con imagen y resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-sm p-8">
        <div className="flex justify-center items-center bg-gray-100 rounded-xl p-6">
          <img
            src={`http://localhost:3000/imagenes/${vehiculo.imagen}`}
            alt={vehiculo.nombre}
            className="w-full h-80 object-contain"
          />
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {vehiculo.nombre}
            </h1>
            {vehiculo.destacado && (
              <span className="inline-block mt-2 bg-amber-300 text-gray-800 px-3 py-1 text-xs font-medium rounded-full">
                🚘 Vehículo destacado
              </span>
            )}
          </div>

          <p className="text-2xl font-semibold text-gray-700">
            S/ {vehiculo.precio?.toLocaleString("es-PE")}
          </p>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {vehiculo.descripcion}
          </p>

          <button
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2.5 rounded-md transition duration-200"
            onClick={handleCompra}
          >
            Comprar ahora
          </button>
        </div>
      </div>

      {/* Sección de especificaciones */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Especificaciones Técnicas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoItem
            icon={<PiCarSimpleDuotone />}
            label="Marca"
            value={vehiculo.marca}
          />
          <InfoItem
            icon={<PiEngineDuotone />}
            label="Motor"
            value={vehiculo.motor}
          />
          <InfoItem
            icon={<PiGasPumpDuotone />}
            label="Combustible"
            value={vehiculo.combustible}
          />
          <InfoItem
            icon={<PiPaletteDuotone />}
            label="Color"
            value={vehiculo.color}
          />
          <InfoItem
            icon={<PiMapPinDuotone />}
            label="Ubicación"
            value={vehiculo.ubicacion}
          />
          <InfoItem
            icon={<PiDoorDuotone />}
            label="Puertas"
            value={vehiculo.puertas}
          />
          <InfoItem
            icon={<PiChairDuotone />}
            label="Asientos"
            value={vehiculo.asientos}
          />
          <InfoItem
            icon={<PiRoadHorizonDuotone />}
            label="Kilometraje"
            value={`${vehiculo.kilometraje} km`}
          />
          <InfoItem
            icon={<PiCheckCircleDuotone />}
            label="Condición"
            value={vehiculo.condicion}
          />
          <InfoItem
            icon={<PiShieldCheckDuotone />}
            label="Garantía"
            value={vehiculo.garantia || "No especificada"}
          />
          <InfoItem
            icon={<PiWarehouseDuotone />}
            label="Stock"
            value={vehiculo.stock}
          />
          <InfoItem
            icon={<PiCalendarDuotone />}
            label="Modelo"
            value={vehiculo.modelo}
          />
          <InfoItem
            icon={<PiSteeringWheelDuotone />}
            label="Transmisión"
            value={vehiculo.transmision}
          />
        </div>
      </section>

      {/* Reseñas */}
      <section className="mt-14 border-t pt-8">
        <Reseñas vehiculoId={vehiculo.vehiculo_id} />
      </section>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
    <div className="text-blue-600 text-xl mr-4">{icon}</div>
    <div>
      <p className="text-gray-800 font-medium">{label}</p>
      <p className="text-gray-600 text-sm">{value}</p>
    </div>
  </div>
);

export default DetailVehicle;
