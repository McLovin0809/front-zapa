import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Forms from "../../components/templates/Forms";
import { generarMensaje } from "../../utils/GenerarMensaje";
import UsuarioService from "../../services/UsuarioService";
import { AuthContext } from "../../context/AuthContext";
import "../../style/pages/AuthPanel.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", clave: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.clave) {
      generarMensaje("Completa todos los campos", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await UsuarioService.login({
        email: form.email,
        clave: form.clave,
      });

      generarMensaje("Login exitoso", "success");
      login(response.data);
      setTimeout(() => navigate("/"), 800);
    } catch (error) {
      console.error("Error en login:", error.response?.data);
      const msg =
        error.response?.data?.message ||
        "Credenciales inválidas. Verifica tu email y contraseña.";
      generarMensaje(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const loginData = [
    {
      type: "text",
      text: [{ content: "Iniciar sesión", variant: "h1", className: "auth-title" }],
    },
    {
      type: "inputs",
      inputs: [
        {
          type: "email",
          placeholder: "Correo electrónico",
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
          autoComplete: "current-password",
          className: "auth-input",
        },
      ],
      className: "auth-inputs",
    },
    {
      type: "button",
      text: loading ? "Ingresando..." : "Iniciar sesión",
      onClick: handleSubmit,
      disabled: loading,
      className: loading ? "auth-button loading" : "auth-button",
    },
  ];

  return (
    <div className="auth-page">
      <main className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <Forms content={loginData} />
        </form>
      </main>
    </div>
  );
};

export default Login;
