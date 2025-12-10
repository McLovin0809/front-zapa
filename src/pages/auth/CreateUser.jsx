import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Forms from "../../components/templates/Forms";
import UsuarioService from "../../services/UsuarioService";
import "../../style/pages/AuthPanel.css";

const comunas = [
  { idComuna: 1, nombre: "Santiago Centro" },
  { idComuna: 2, nombre: "Providencia" },
  // ...
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
      setForm((prev) => ({ ...prev, direccion: { ...prev.direccion, [field]: value } }));
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

    // Define rol por dominio (ejemplo)
    let rolId = null;
    if (email.endsWith("@admin.com")) rolId = 1;
    else rolId = 2;

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

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre completo" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Correo" required />
        <input type="password" name="clave" value={form.clave} onChange={handleChange} placeholder="Contraseña" required />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono (opcional)" />
        <input name="direccion.calle" value={form.direccion.calle} onChange={handleChange} placeholder="Calle" required />
        <input name="direccion.numero" value={form.direccion.numero} onChange={handleChange} placeholder="Número" required />
        <select name="direccion.idComuna" value={form.direccion.idComuna} onChange={handleChange} required>
          <option value="">Selecciona comuna</option>
          {comunas.map(c => <option key={c.idComuna} value={c.idComuna}>{c.nombre}</option>)}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Creando usuario..." : "Crear usuario"}
        </button>
      </form>
    </main>
  );
};

export default CreateUser;
