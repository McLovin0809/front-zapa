import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Forms from "../../components/templates/Forms";
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
    alert("Completa todos los campos");
    return;
  }

  setLoading(true);

  try {
    const response = await UsuarioService.login({
      email: form.email,
      clave: form.clave,
    });

    console.log("Login OK:", response.data);

    // ✅ GUARDAR TOKEN
    localStorage.setItem("token", response.data.token);

    // ✅ GUARDAR SOLO DATOS DEL USUARIO
    localStorage.setItem(
      "usuario",
      JSON.stringify({
        nombre: response.data.usuario,
        email: response.data.email
      })
    );

    // ✅ CONTEXTO
    if (login) {
      login({
        nombre: response.data.usuario,
        email: response.data.email
      });
    }

    if (response.data.email.toLowerCase().includes("admin")) {
      setTimeout(() => navigate("/Admin/HomeAdmin"), 500);
    } else {
      setTimeout(() => navigate("/perfil"), 500);
    }

  } catch (error) {
    console.error("Error en login:", error.response?.data);
    alert("Correo o contraseña incorrectos");
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
