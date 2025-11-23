import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import CreateUser from "./CreateUser";
import "../../style/pages/AuthPanel.css";

export default function AuthPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegistering = location.pathname === "/register";

  const toggleRoute = () => {
    navigate(isRegistering ? "/login" : "/register");
  };

  return (
    <div className="auth-panel-wrapper">
      <div className="auth-panel-container">
        {/* Panel lateral */}
        <div className="auth-side-panel">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="auth-side-content"
          >
            <h2>{isRegistering ? "¡Hola de nuevo!" : "¡Bienvenido!"}</h2>
            <p>{isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta aún?"}</p>
            <button className="auth-toggle-button" onClick={toggleRoute}>
              {isRegistering ? "Iniciar sesión" : "Registrarse"}
            </button>
          </motion.div>
        </div>

        {/* Panel de formulario */}
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
                <CreateUser />
                <button className="auth-link" onClick={toggleRoute}>
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
                <button className="auth-link" onClick={toggleRoute}>
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
