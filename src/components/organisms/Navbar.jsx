import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navVariants, itemVariants } from '../../animations/navbarAnimation';
import "../../style/components/Navbar.css"

function Navbar({ links, title }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        setIsOpen(false);
    };

    const handleLinkClick = (e, link) => {
        if (link.label === 'Salir') {
            e.preventDefault();
            handleLogout();
        } else {
            setIsOpen(false);
        }
    };

    return (
        <header className="navbar">
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
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            /*whileHover={{ 
                                scale: 1.05,
                                y: -2,
                            }}
                            whileTap={{ scale: 0.95 }} ver si hay otra forma mejor de hacer con el css*/
                        >
                            <NavLink
                                to={link.to}
                                onClick={(e) => link.label === 'Salir' && handleLinkClick(e, link)}
                                className={({ isActive }) => 
                                    `nav-link ${isActive ? 'nav-link--active' : ''}`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.div>

                <button 
                    className="nav-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger ${isOpen ? 'hamburger--open' : ''}`}></span>
                </button>
                
                {isOpen && (
                    <>
                        <div
                            className="nav-overlay"
                            onClick={() => setIsOpen(false)}
                        />
                        
                        <div className="nav-mobile nav-mobile--open">
                            <div className="nav-mobile-content">
                                {links.map((link, i) => (
                                    <div key={i}>
                                        <NavLink
                                            to={link.to}
                                            onClick={(e) => handleLinkClick(e, link)}
                                            className={({ isActive }) => 
                                                `nav-mobile-link ${isActive ? 'nav-mobile-link--active' : ''}`
                                            }
                                        >
                                            {link.label}
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </motion.nav>
        </header>
    );
}

export default Navbar;