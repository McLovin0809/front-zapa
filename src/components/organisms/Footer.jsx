import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaCcVisa,
  FaCcMastercard,
  FaMoneyBillWave
} from "react-icons/fa";
import "../../style/components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">

        {/* Centro de ayuda */}
        <div className="footer-column">
          <h4>Centro de ayuda</h4>
          <ul>
            <li><Link to="/contact">Contacto</Link></li>
          </ul>
        </div>

        {/* Tienda */}
        <div className="footer-column">
          <h4>Tienda</h4>
          <ul>
            <li><Link to="/">Tiendas</Link></li>
            <li><Link to="/">Política de privacidad</Link></li>
            <li><Link to="/">Preguntas frecuentes</Link></li>
            <li><Link to="/">Términos y condiciones</Link></li>
          </ul>
        </div>

        {/* Redes Sociales y Métodos de Pago */}
        <div className="footer-column">
          <h4>Redes Sociales</h4>
          <div className="social-icons">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
          </div>

          <h4>Métodos de Pago</h4>
          <div className="payment-logos">
            <FaCcVisa />
            <FaCcMastercard />
            <FaMoneyBillWave /> {/* Ícono general para Redcompra / MercadoPago */}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ZapaStore. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;