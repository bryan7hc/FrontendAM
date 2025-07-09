import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Volvo from "../assets/Volvo.png";
import Electrificacion from "../assets/Electrificacion.png";
import Seguridad from "../assets/Seguridad.png";
import Sustentabilidad from "../assets/Sustentabilidad.png";

const Hero = () => {
  const [autosDestacados, setAutosDestacados] = useState([]);
  const backendUrl = "http://localhost:3000/imagenes";

  useEffect(() => {
    const obtenerDestacados = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/vehiculos/destacados"
        );

        const autos = res.data.map((auto) => ({
          ...auto,
          imagen: `${backendUrl}/${auto.imagen}`,
        }));

        setAutosDestacados(autos);
        console.log("Autos destacados recibidos:", autos);
      } catch (error) {
        console.error("Error al obtener autos destacados:", error);
      }
    };

    obtenerDestacados();
  }, []);

  return (
    <div className="mt-30">
      {/* Imagen principal */}
      <div className="w-full flex justify-center">
        <img
          src={Volvo}
          alt="Imagen principal"
          className="w-full max-w-screen-xl h-[500px] object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Título */}
      <h2 className="mt-16 mb-8 text-3xl font-bold text-gray-800 text-center sm:text-left px-4 max-w-screen-xl mx-auto">
        Modelos destacados
      </h2>

      {/* Carrusel de autos */}
      <CarruselAutos autosDestacados={autosDestacados} />

      {/* Sección de valores */}
      <section className="mt-24 max-w-screen-xl mx-auto px-4 text-center">
        <p className="text-2xl sm:text-3xl font-semibold text-gray-700 leading-relaxed mb-14">
          Nos dedicamos a brindarte la libertad de moverte de forma personal,
          sostenible y segura.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <CardValor
            imagen={Electrificacion}
            titulo="Electrificación"
            descripcion="Promovemos vehículos eléctricos que reducen la contaminación y mejoran la eficiencia energética."
          />
          <CardValor
            imagen={Seguridad}
            titulo="Seguridad"
            descripcion="Equipamos nuestros vehículos con tecnología avanzada para protegerte a ti y a tu familia."
          />
          <CardValor
            imagen={Sustentabilidad}
            titulo="Sustentabilidad"
            descripcion="Nuestro compromiso es con el cuidado del planeta, fomentando prácticas responsables y verdes."
          />
        </div>
      </section>
    </div>
  );
};

// Carrusel con validación del slug


const CarruselAutos = ({ autosDestacados }) => {
  const navigate = useNavigate();
  const sliderRef = React.useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1, // Mostrar solo uno
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  if (!Array.isArray(autosDestacados) || autosDestacados.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No hay autos destacados disponibles.
      </p>
    );
  }

  return (
    <div className="relative max-w-3xl mx-auto px-4">
      {/* Botones de navegación personalizados */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100"
      >
        <FaChevronLeft className="text-gray-700" />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100"
      >
        <FaChevronRight className="text-gray-700" />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {autosDestacados.map((auto) => (
          <div key={auto.vehiculo_id} className="px-3 py-6">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col items-center text-center p-6">
              <img
                src={auto.imagen}
                alt={auto.nombre}
                className="h-56 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {auto.nombre}
              </h3>
              <p className="text-sm text-gray-600 mt-1 mb-4">
                S/. {Number(auto.precio).toFixed(2)}
              </p>
              {auto.slug ? (
                <button
                  onClick={() => navigate(`/vehiculo/${auto.slug}`)}
                  className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded-md transition"
                >
                  Explorar
                </button>
              ) : (
                <span className="text-red-500 text-sm">Slug no disponible</span>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Tarjetas informativas
const CardValor = ({ imagen, titulo, descripcion }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition">
    <img src={imagen} alt={titulo} className="h-28 w-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{titulo}</h3>
    <p className="text-sm text-gray-600">{descripcion}</p>
  </div>
);

export default Hero;
