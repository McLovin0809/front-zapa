import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Register from "./Register";
import "../../style/pages/AuthPanel.css";

export default function AuthPanel() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  // Detecta la ruta actual y ajusta el estado
  useEffect(() => {
    if (location.pathname === "/register") {
      setIsRegistering(true);
    } else {
      setIsRegistering(false);
    }
  }, [location.pathname]);

  // Cambia estado y URL al mismo tiempo
  const handleToggle = () => {
    const nextPath = isRegistering ? "/login" : "/register";
    navigate(nextPath);
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="auth-panel-wrapper">
      <div className="auth-panel-container">
        <div className="auth-side-panel">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="auth-side-content"
          >
            <h2>{isRegistering ? "¡Hola de nuevo!" : "¡Bienvenido!"}</h2>
            <button className="auth-toggle-button" onClick={handleToggle}>
              {isRegistering ? "Iniciar sesión" : "Registrarse"}
            </button>
          </motion.div>
        </div>

        <div className="auth-form-panel">
          <AnimatePresence mode="wait">
            {isRegistering ? (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="auth-form-wrapper"
              >
                <Register />
                <button className="auth-link" onClick={handleToggle}>
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className="auth-form-wrapper"
              >
                <Login />
                <button className="auth-link" onClick={handleToggle}>
                  ¿No tienes cuenta? Regístrate
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
