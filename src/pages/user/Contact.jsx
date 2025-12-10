import React, { useState, useEffect } from "react";
import "../../style/pages/Contact.css";
import { generarMensaje } from "../../utils/GenerarMensaje";
import Footer from '../../components/organisms/Footer';
const Contac = () => {
    const [form, setForm] = useState({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    });

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const { nombre, email, asunto, mensaje } = form;

      if (!nombre || !email || !asunto || !mensaje) {
        generarMensaje("Completa todos los campos", "warning");
        return;
      }

      generarMensaje("Mensaje enviado correctamente", "success");
      setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
    };

    return (
      <main>
        <div className="contact-page">
          <h1 className="contact-title">Contáctanos</h1>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              className="contact-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Tu correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="contact-input"
              required
            />
            <input
              type="text"
              name="asunto"
              placeholder="Asunto"
              value={form.asunto}
              onChange={handleChange}
              className="contact-input"
              required
            />
            <textarea
              name="mensaje"
              placeholder="Escribe tu mensaje..."
              value={form.mensaje}
              onChange={handleChange}
              className="contact-textarea"
              required
            />
            <button type="submit" className="contact-button">
              Enviar mensaje
            </button>
          </form>
        </div>
      <Footer/>
    </main>
  );
};

export default Contac;
