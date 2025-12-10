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
          Estabamos en una junta y nos miramos a los pies y pensamos en querer innovar vendiendo zapatillas asi que aqui estamos 
        </p>
      </section>

      <section className="about-section">
        <h2>Misión</h2>
        <p>
          Propocionar soluciones y satisfaciones a nuestros clientes mediantes sus gustos por el calzado
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
          Somos un equipo de 3 desarrolladores FullStack 
        </p>
      </section>
    </div>
  );
};

export default About;
