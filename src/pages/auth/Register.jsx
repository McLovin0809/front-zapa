import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Forms from "../../components/templates/Forms";
import { registerData } from "./AuthData/AuthData";
import UsuarioService from "../../services/usuarioService";
import "../../style/pages/AuthPanel.css";

export default function Register() {
  const [form, setForm] = useState({ nombre: "", email: "", clave: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await UsuarioService.register(form);
      alert("Usuario creado: " + data.email);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  const formDataWithHandlers = registerData.map((item) => {
    if (item.type === "inputs") {
      return {
        ...item,
        inputs: item.inputs.map((input) => ({
          ...input,
          value: form[input.name],
          onChange: handleChange,
        })),
      };
    }
    if (item.type === "button") {
      return {
        ...item,
        onClick: handleSubmit,
        disabled: loading,
        text: loading ? "Creando..." : item.text,
      };
    }
    return item;
  });

  return (
    <main className="auth-page">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="auth-form"
      >
        <Forms content={formDataWithHandlers} />
     
      </motion.form>
    </main>
  );
}
