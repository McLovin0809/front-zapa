import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { navVariants, itemVariants } from "../../animations/navbarAnimation";
import { AuthContext } from "../../context/AuthContext";
import "../../style/components/Navbar.css";

function Navbar({ links, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const handleLinkClick = (e, link) => {
    if (link.label === "Salir") {
      e.preventDefault();
      handleLogout();
    } else {
      navigate(link.to);
      setIsOpen(false);
    }
  };

  return (
    <header>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="nav"
      >
        <motion.div
          className="nav-content"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          {links.map((link, i) => (
            <motion.div key={i} variants={itemVariants}>
              <NavLink
                to={link.to}
                onClick={(e) => handleLinkClick(e, link)}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link--active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            </motion.div>
          ))}

          {/* ✅ Mostrar solo uno: Perfil o Iniciar sesión */}
          {!user?.email ? (
            <motion.div variants={itemVariants}>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link--active" : ""}`
                }
              >
                Iniciar sesión
              </NavLink>
            </motion.div>
          ) : (
            <motion.div variants={itemVariants}>
              <NavLink
                to="/perfil"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link--active" : ""}`
                }
              >
                Perfil
              </NavLink>
            </motion.div>
          )}
        </motion.div>

        {/* Menú móvil */}
        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isOpen ? "hamburger--open" : ""}`}></span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="nav-overlay"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="nav-mobile nav-mobile--open"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
              >
                <div className="nav-mobile-content">
                  {links.map((link, i) => (
                    <div key={i}>
                      <NavLink
                        to={link.to}
                        onClick={(e) => handleLinkClick(e, link)}
                        className={({ isActive }) =>
                          `nav-mobile-link ${isActive ? "nav-mobile-link--active" : ""}`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </div>
                  ))}

                  {/* ✅ Condicional en menú móvil */}
                  {!user?.email ? (
                    <div>
                      <NavLink
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `nav-mobile-link ${isActive ? "nav-mobile-link--active" : ""}`
                        }
                      >
                        Iniciar sesión
                      </NavLink>
                    </div>
                  ) : (
                    <div>
                      <NavLink
                        to="/perfil"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `nav-mobile-link ${isActive ? "nav-mobile-link--active" : ""}`
                        }
                      >
                        Perfil
                      </NavLink>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}

export default Navbar;
