import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Forms from "../../components/templates/Forms";
import UsuarioService from "../../services/UsuarioService";
import "../../style/pages/AuthPanel.css";

const comunas = [
  { idComuna: 1, nombre: "Santiago Centro" },
  { idComuna: 2, nombre: "Providencia" },
  { idComuna: 3, nombre: "Arica" },
  { idComuna: 4, nombre: "Iquique" },
  { idComuna: 5, nombre: "Antofagasta" },
  { idComuna: 6, nombre: "Copiapó" },
  { idComuna: 7, nombre: "La Serena" },
  { idComuna: 8, nombre: "Valparaíso" },
  { idComuna: 9, nombre: "Rancagua" },
  { idComuna: 10, nombre: "Talca" },
  { idComuna: 11, nombre: "Chillán" },
  { idComuna: 12, nombre: "Concepción" },
  { idComuna: 13, nombre: "Temuco" },
  { idComuna: 14, nombre: "Valdivia" },
  { idComuna: 15, nombre: "Puerto Montt" },
  { idComuna: 16, nombre: "Coyhaique" },
  { idComuna: 17, nombre: "Punta Arenas" }
];

const CreateUser = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    clave: "",
    telefono: "",
    direccion: { calle: "", numero: "", idComuna: "" }
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("direccion.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, [field]: value }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email, clave, direccion } = form;
    if (!nombre || !email || !clave || !direccion.calle || !direccion.numero || !direccion.idComuna) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    // Rol según dominio del correo
    let rolId;
    if (email.endsWith("@admin.com")) rolId = 1;
    else if (email.endsWith("@cliente.com")) rolId = 2;
    else {
      alert("El correo debe terminar en @admin.com o @cliente.com");
      return;
    }

    setLoading(true);

    try {
      const usuario = {
        nombre,
        email,
        clave,
        telefono: form.telefono || null,
        rol: { idRol: rolId },
        direccion: {
          calle: direccion.calle,
          numero: direccion.numero,
          comuna: { idComuna: parseInt(direccion.idComuna) }
        }
      };

      await UsuarioService.createUsuario(usuario);
      alert("Usuario creado correctamente");
      navigate("/login");
    } catch (error) {
      console.error("Error al crear usuario:", error.response?.data);
      alert("Error al crear usuario. Puede que el correo ya exista.");
    } finally {
      setLoading(false);
    }
  };

  const comunaOptions = [
    { label: "Selecciona comuna", value: "" },
    ...comunas.map((c) => ({ label: c.nombre, value: c.idComuna }))
  ];

  const createUserData = [
    { type: "text", text: [{ content: "Crear usuario", variant: "h1", className: "auth-title" }] },
    {
      type: "inputs",
      inputs: [
        { type: "text", placeholder: "Nombre completo", name: "nombre", value: form.nombre, onChange: handleChange, required: true, className: "auth-input" },
        { type: "email", placeholder: "Correo electrónico", name: "email", value: form.email, onChange: handleChange, required: true, className: "auth-input" },
        { type: "password", placeholder: "Contraseña", name: "clave", value: form.clave, onChange: handleChange, required: true, className: "auth-input" },
        { type: "text", placeholder: "Teléfono (opcional)", name: "telefono", value: form.telefono, onChange: handleChange, className: "auth-input" },
        { type: "text", placeholder: "Calle", name: "direccion.calle", value: form.direccion.calle, onChange: handleChange, required: true, className: "auth-input" },
        { type: "text", placeholder: "Número", name: "direccion.numero", value: form.direccion.numero, onChange: handleChange, required: true, className: "auth-input" },
        { type: "select", name: "direccion.idComuna", value: form.direccion.idComuna, onChange: handleChange, options: comunaOptions, required: true, className: "auth-input" }
      ],
      className: "auth-inputs"
    },
    { type: "button", text: loading ? "Creando usuario..." : "Crear usuario", onClick: handleSubmit, disabled: loading, className: loading ? "auth-button loading" : "auth-button" }
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
