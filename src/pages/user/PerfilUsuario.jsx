import React, { useEffect, useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import "../../style/pages/Perfil.css";

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (!storedUser) {
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    UsuarioService.getUsuarioById(parsedUser.idUsuario)
      .then((res) => setUsuario(res.data))
      .catch((err) => console.error("Error al cargar perfil:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/"; 
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (!usuario) return <p>No se encontró el usuario.</p>;

  return (
    <div className="perfil-page">
      <div className="perfil-card">
        <div className="perfil-header">
          <img src="/avatar.png" alt="Avatar" className="perfil-avatar" />
          <h2>{usuario.nombre}</h2>
          <p className="perfil-email">{usuario.email}</p>
        </div>

        <div className="perfil-info">
          <h3>Información personal</h3>
          <ul>
            <li><strong>Teléfono:</strong> {usuario.telefono || "No registrado"}</li>
            <li><strong>Rol:</strong> {usuario.rol?.nombre}</li>
            <li><strong>Dirección:</strong> {usuario.direccion?.calle} #{usuario.direccion?.numero}</li>
            <li><strong>Comuna:</strong> {usuario.direccion?.comuna?.nombre}</li>
            <li><strong>Región:</strong> {usuario.direccion?.comuna?.region?.nombre}</li>
          </ul>
        </div>

        <div className="perfil-actions">
          <button className="perfil-btn logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
