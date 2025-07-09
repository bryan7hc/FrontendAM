import React from "react";
import { FaInstagram, FaFacebookF, FaShieldAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-16 mt-20 text-gray-700 text-sm">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Columna 1: Información general */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Somos AutoMundo
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Ubícanos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Ayúdanos a mejorar
              </a>
            </li>
          </ul>

          <div className="mt-6">
            <p className="font-semibold mb-2 text-gray-900">Síguenos:</p>
            <div className="flex gap-4 text-xl text-gray-600">
              <a href="#" aria-label="Instagram" className="hover:text-red-600">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-red-600">
                <FaFacebookF />
              </a>
            </div>
          </div>
        </div>

        {/* Columna 2: Atención al Cliente */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Atención al Cliente
          </h3>
          <p className="text-gray-800 font-medium">+01 712 - 3333</p>
          <p>Lun. - Sáb. de 9:00am a 6:00pm</p>
          <a
            href="mailto:servicionalcliente@ser.com"
            className="block mt-1 hover:text-red-600"
          >
            servicionalcliente@ser.com
          </a>
          <p className="mt-4">Libro de Reclamaciones</p>

          <p className="mt-6 text-xs text-gray-500">RUC: 20378890121</p>
          <p className="text-xs text-gray-500">Razón social: AT. S.A.C.</p>
        </div>

        {/* Columna 3: Servicios al Cliente */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Servicios al Cliente
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Contacto
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Cambios y devoluciones
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Medios de pago
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Compra fácil y segura
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Términos y condiciones
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 4: Métodos de pago */}
        <div className="bg-gray-800 text-white p-6 rounded-xl">
          <h4 className="text-base font-semibold mb-3">Métodos de pago</h4>
          <div className="flex flex-wrap gap-3 mb-4">
            <img
              src="/metodos/mercadopago.svg"
              alt="Mercado Pago"
              className="h-6"
            />
            <img
              src="/metodos/mastercard.svg"
              alt="MasterCard"
              className="h-6"
            />
            <img src="/metodos/visa.svg" alt="Visa" className="h-6" />
            <img src="/metodos/yape.svg" alt="Yape" className="h-6" />
            <img src="/metodos/plin.svg" alt="Plin" className="h-6" />
            <img
              src="/metodos/amex.svg"
              alt="American Express"
              className="h-6"
            />
          </div>

          <h4 className="font-semibold mb-1 text-white">Compra segura</h4>
          <p className="text-xs text-gray-300 mb-2">
            Ambiente protegido con cifrado SSL
          </p>

          <div className="flex items-start gap-3 text-xs text-gray-300 mt-2">
            <FaShieldAlt className="text-white text-lg" />
            <div>
              <p>Sitio seguro</p>
              <p>Transacciones protegidas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pie final */}
      <div className="mt-12 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} AutoMundo. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
