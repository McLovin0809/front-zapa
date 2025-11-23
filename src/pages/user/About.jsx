import React from "react";
import "../../style/pages/About.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1 className="about-title">Sobre Nosotros</h1>
        <p className="about-subtitle">
          En <strong>ZAPASTORE</strong> creemos que la moda y la comodidad deben ir de la mano.
        </p>
      </section>

      <section className="about-section">
        <h2>Nuestra Historia</h2>
        <p>
          Desde nuestros humildes comienzos, hemos crecido y evolucionado, siempre comprometidos con la excelencia y la satisfacción del cliente.
        </p>
      </section>

      <section className="about-section">
        <h2>Misión</h2>
        <p>
          Proporcionar soluciones innovadoras y personalizadas, creando valor para nuestros clientes y contribuyendo al desarrollo sostenible.
        </p>
      </section>

      <section className="about-section">
        <h2>Visión</h2>
        <p>
          Ser líderes en nuestro sector, reconocidos por nuestra calidad, integridad y compromiso con la mejora continua.
        </p>
      </section>

      <section className="about-section">
        <h2>Nuestro Equipo</h2>
        <p>
          Contamos con un equipo talentoso y apasionado, que trabaja en conjunto para alcanzar metas comunes y superar expectativas.
        </p>
      </section>
    </div>
  );
};

export default About;
