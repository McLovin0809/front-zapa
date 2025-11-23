import React from "react";
import { Link } from "react-router-dom";
import "../../style/components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        {/* Centro de ayuda */}
        <div className="footer-column">
          <h4>Centro de ayuda</h4>
          <ul>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Tienda */}
        <div className="footer-column">
          <h4>Tienda</h4>
          <ul>
            <li><Link to="/tiendas">Tiendas</Link></li>
            <li><Link to="/privacidad">Política de privacidad</Link></li>
            <li><Link to="/faq">Preguntas frecuentes</Link></li>
            <li><Link to="/terminos">Términos y condiciones</Link></li>
          </ul>
        </div>

        {/* Redes y pagos */}
        <div className="footer-column">
          <h4>Redes Sociales</h4>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        <div className="footer-column">
            <h4>Metodos de pago</h4>
        </div>
          <div className="payment-logos">
            
            <span>Visa</span>
            <span>MasterCard</span>
            <span>Redcompra</span>
            <span>Mercado Pago</span>
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
