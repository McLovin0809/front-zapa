import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Forms from "../../components/templates/Forms";
import { generarMensaje } from "../../utils/GenerarMensaje";
import UsuarioService from "../../services/UsuarioService";
import "../../style/pages/AuthPanel.css";

const CreateUser = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    clave: "",
    telefono: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.clave) {
      generarMensaje("Completa todos los campos obligatorios", "warning");
      return;
    }

    // ✅ Definir rol según el dominio del correo
    let rolId = null;
    if (form.email.endsWith("@admin.com")) {
      rolId = 1;
    } else if (form.email.endsWith("@cliente.com")) {
      rolId = 2;
    } else {
      generarMensaje("El correo debe terminar en @admin.com o @cliente.com", "error");
      return;
    }

    setLoading(true);

    try {
      const usuario = {
        nombre: form.nombre,
        email: form.email,
        clave: form.clave,
        telefono: form.telefono || null,
        rol: { idRol: rolId },
      };

      await UsuarioService.createUsuario(usuario);
      generarMensaje("Usuario creado correctamente. Ahora inicia sesión", "success");
      setTimeout(() => navigate("/login"), 800);
    } catch (error) {
      console.error("Error al registrar usuario:", error.response?.data);
      const msg =
        error.response?.data?.message ||
        "Error al crear usuario. Verifica los datos o si el email ya existe.";
      generarMensaje(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const createUserData = [
    {
      type: "text",
      text: [{ content: "Crear usuario", variant: "h1", className: "auth-title" }],
    },
    {
      type: "inputs",
      inputs: [
        {
          type: "text",
          placeholder: "Nombre completo",
          name: "nombre",
          value: form.nombre,
          onChange: handleChange,
          required: true,
          autoComplete: "name",
          className: "auth-input",
        },
        {
          type: "email",
          placeholder: "Correo electrónico (ej: usuario@admin.com o usuario@cliente.com)",
          name: "email",
          value: form.email,
          onChange: handleChange,
          required: true,
          autoComplete: "email",
          className: "auth-input",
        },
        {
          type: "password",
          placeholder: "Contraseña",
          name: "clave",
          value: form.clave,
          onChange: handleChange,
          required: true,
          autoComplete: "new-password",
          className: "auth-input",
        },
        {
          type: "text",
          placeholder: "Teléfono (opcional)",
          name: "telefono",
          value: form.telefono,
          onChange: handleChange,
          autoComplete: "tel",
          className: "auth-input",
        },
      ],
      className: "auth-inputs",
    },
    {
      type: "button",
      text: loading ? "Creando usuario..." : "Crear usuario",
      onClick: handleSubmit,
      disabled: loading,
      className: loading ? "auth-button loading" : "auth-button",
    },
  ];

  return (
    <div className="auth-page">
      <main className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <Forms content={createUserData} />
        </form>
      </main>
    </div>
  );
};

export default CreateUser;
