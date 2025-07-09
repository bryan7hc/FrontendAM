import React from "react";

const QuienesSomos = () => {
  return (
    <section className="mt-28">
      {/* Header visual */}
      <div className="bg-gray-100 py-10 px-6 text-center shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800">¿Quiénes somos?</h1>
        <p className="mt-2 text-gray-600 text-base max-w-3xl mx-auto">
          Conectamos personas con su vehículo ideal a través de una plataforma confiable, eficiente y transparente.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 leading-relaxed space-y-6">
        <p className="text-justify">
          En <span className="font-semibold text-gray-900">AutoMundo</span>, nos apasiona el mundo automotriz. Nuestra misión es ofrecer
          una experiencia de compra y venta de vehículos que combine
          seguridad, rapidez y transparencia en cada paso del proceso.
        </p>

        <p className="text-justify">
          Somos un equipo multidisciplinario con años de experiencia en el
          rubro, comprometidos con brindar un servicio profesional, humano y
          confiable. Apostamos por la tecnología como motor de cambio y por eso
          creamos esta plataforma que te permite explorar, comparar y adquirir
          vehículos desde la comodidad de tu hogar.
        </p>

        <p className="text-justify">
          Trabajamos con honestidad, innovación y orientación al cliente. Gracias
          por confiar en nosotros y ser parte del camino hacia tu próximo auto.
        </p>
      </div>
    </section>
  );
};

export default QuienesSomos;
