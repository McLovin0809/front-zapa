import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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

      // Guardar y setear contexto
      login({ nombre: data.usuario, email: data.email, rol: data.rol }, data.token);

      // Redirección por rol (mejor que por email)
      if (data.rol === "ADMIN") {
        navigate("/Admin/HomeAdmin");
      } else {
        navigate("/perfil");
      }
    } catch (error) {
      console.error("Error en login:", error.response?.data);
      alert("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <input
          type="password"
          name="clave"
          placeholder="Contraseña"
          value={form.clave}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </main>
  );
};

export default Login;
