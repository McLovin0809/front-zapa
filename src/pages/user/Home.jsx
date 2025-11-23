import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';
import TextAtom from '../../components/atoms/TextAtom';
import carouselImages from '../../data/image/image';
import Footer from '../../components/organisms/Footer';
import { motion } from 'framer-motion';
import { carouselVariants, itemVariants } from '../../animations/carouselAnimations';
import '../../style/pages/Home.css'

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        fetchProductos();
        
        // Auto-play para el carousel
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    const fetchProductos = () => {
        ProductoService.getAllProductos().then(response => {
            setProductos(response.data);
            setLoading(false);
        }).catch(error => {
            console.log('Error fetching productos:', error);
            setLoading(false);
        });
    };

    const calcularPrecioConDescuento = (precio, descuento) => {
        return (precio * (1 - descuento / 100)).toFixed(2);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <main>
            <div className="home">
                {/* Carousel de imágenes */}
                <motion.div 
                className="carousel"
                variants={carouselVariants}
                initial="hidden"
                animate="visible"
                >
                <div className="carousel-inner">
                    {carouselImages.map((image, index) => (
                    <div 
                        key={index}
                        className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <img 
                        src={image.src} 
                        alt={image.alt}
                        className="carousel-image"
                        />
                        <motion.div 
                        className="carousel-content"
                        variants={carouselVariants}
                        >
                        <motion.div variants={itemVariants}>
                            <TextAtom variant="h2" className="carousel-title">
                            {image.title}
                            </TextAtom>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <TextAtom variant="p" className="carousel-description">
                            {image.description}
                            </TextAtom>
                        </motion.div>
                        <motion.button 
                            className="carousel-btn"
                            variants={itemVariants}
                        >
                            Ver Colección
                        </motion.button>
                        </motion.div>
                    </div>
                    ))}
                </div>

                {/* El resto sin cambios */}
                <button className="carousel-btn prev" onClick={prevSlide}>
                    ‹
                </button>
                <button className="carousel-btn next" onClick={nextSlide}>
                    ›
                </button>

                <div className="carousel-indicators">
                    {carouselImages.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                    ))}
                </div>
                </motion.div>

                
                <div className="productos-grid">
                    {productos.map(producto => (
                        <div key={producto.idProducto} className="producto-card">
                            <div className="producto-imagen-container">
                                <img 
                                    src={producto.imgPrincipal} 
                                    alt={producto.nombre}
                                    className="producto-imagen"
                                />
                            </div>

                            <div className="producto-info">
                                <TextAtom variant="h3" className="producto-nombre">
                                    {producto.nombre}
                                </TextAtom>

                                <TextAtom variant="p" className="producto-descripcion">
                                    {producto.descripcion}
                                </TextAtom>

                                <div className="producto-precio-container">
                                    {producto.descuento > 0 ? (
                                        <>
                                            <TextAtom variant="span" className="producto-precio-descuento">
                                                ${calcularPrecioConDescuento(producto.precio, producto.descuento)}
                                            </TextAtom>
                                            <TextAtom variant="span" className="producto-precio-original">
                                                ${producto.precio}
                                            </TextAtom>
                                            <TextAtom variant="span" className="producto-descuento-tag">
                                                -{producto.descuento}%
                                            </TextAtom>
                                        </>
                                    ) : (
                                        <TextAtom variant="span" className="producto-precio-normal">
                                            ${producto.precio}
                                        </TextAtom>
                                    )}
                                </div>

                                <div className="producto-caracteristicas">
                                    {producto.marca && (
                                        <div className="caracteristica-item">
                                            <TextAtom variant="span" className="caracteristica-label">
                                                Marca:
                                            </TextAtom>
                                            <TextAtom variant="span" className="caracteristica-valor">
                                                {producto.marca.nombre}
                                            </TextAtom>
                                        </div>
                                    )}
                                    
                                    {producto.genero && (
                                        <div className="caracteristica-item">
                                            <TextAtom variant="span" className="caracteristica-label">
                                                Género:
                                            </TextAtom>
                                            <TextAtom variant="span" className="caracteristica-valor">
                                                {producto.genero.nombre}
                                            </TextAtom>
                                        </div>
                                    )}

                                    <div className="caracteristica-item">
                                        <TextAtom variant="span" className="caracteristica-label">
                                            Stock:
                                        </TextAtom>
                                        <TextAtom 
                                            variant="span" 
                                            className={`caracteristica-valor ${
                                                producto.stock > 0 ? 'stock-disponible' : 'stock-agotado'
                                            }`}
                                        >
                                            {producto.stock > 0 ? `${producto.stock} disponibles` : 'Agotado'}
                                        </TextAtom>
                                    </div>

                                    {producto.ecofriendly && (
                                        <div className="caracteristica-item">
                                            <TextAtom variant="span" className="caracteristica-label">
                                                Eco:
                                            </TextAtom>
                                            <TextAtom variant="span" className="caracteristica-valor eco-friendly">
                                                Friendly
                                            </TextAtom>
                                        </div>
                                    )}
                                </div>

                                <div className="producto-botones">
                                    <button 
                                        className={`btn-agregar-carrito ${
                                            producto.stock > 0 ? 'btn-disponible' : 'btn-agotado'
                                        }`}
                                        disabled={producto.stock === 0}
                                    >
                                        <TextAtom variant="span">
                                            {producto.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
                                        </TextAtom>
                                    </button>
                                    
                                    <Link 
                                        to={`/producto/${producto.idProducto}`}
                                        className="btn-ver-detalles"
                                    >
                                        <TextAtom variant="span">
                                            Ver
                                        </TextAtom>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {productos.length === 0 && (
                    <div className="no-productos">
                        <TextAtom variant="h3" className="no-productos-title">
                            No hay productos disponibles
                        </TextAtom>
                        <TextAtom variant="p" className="no-productos-text">
                            Pronto agregaremos nuevos productos a nuestra tienda.
                        </TextAtom>
                    </div>
                )}

                <div className="productos-contador">
                    <TextAtom variant="p" className="contador-text">
                        Mostrando {productos.length} producto{productos.length !== 1 ? 's' : ''}
                    </TextAtom>
                </div>
        
            </div>
            <Footer/>
        </main>
    );
};

export default Home;