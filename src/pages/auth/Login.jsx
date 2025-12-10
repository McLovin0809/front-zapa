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
    const { data } = await UsuarioService.login(form);

    login({ nombre: data.usuario, email: data.email, rol: data.rol }, data.token);

    if (data.rol === "ADMIN") {
      navigate("/Admin/HomeAdmin");
    } else {
      navigate("/perfil");
    }
  } catch (error) {
    alert("Correo o contraseña incorrectos");
  } finally {
    setLoading(false);
  }
};

  const loginData = [
    { type: "text", text: [{ content: "Iniciar sesión", variant: "h1", className: "auth-title" }] },
    {
      type: "inputs",
      inputs: [
        { type: "email", placeholder: "Correo electrónico", name: "email", value: form.email, onChange: handleChange, required: true, autoComplete: "email", className: "auth-input" },
        { type: "password", placeholder: "Contraseña", name: "clave", value: form.clave, onChange: handleChange, required: true, autoComplete: "current-password", className: "auth-input" },
      ],
      className: "auth-inputs",
    },
    { type: "button", text: loading ? "Ingresando..." : "Iniciar sesión", onClick: handleSubmit, disabled: loading, className: loading ? "auth-button loading" : "auth-button" },
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
