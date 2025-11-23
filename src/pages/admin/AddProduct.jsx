import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';
import MarcaService from '../../services/MarcaService';
import GeneroService from '../../services/GeneroService';
import CategoriaService from '../../services/CategoriaService';
import TextAtom from '../../components/atoms/TextAtom';
import '../../style/pages/AddProduct.css';

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [marcas, setMarcas] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        descuento: '0',
        imgPrincipal: '',
        imgSecundaria: '',
        imgExtra: '',
        marca: { id: '' },
        genero: { id: '' },
        categoria: { id: '' }
    });

    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState({
        principal: '',
        secundaria: '',
        extra: ''
    });

    useEffect(() => {
        fetchDropdownData();
    }, []);

    const fetchDropdownData = async () => {
        setLoading(true);
        try {
            const [marcasRes, generosRes, categoriasRes] = await Promise.all([
                MarcaService.getAllMarcas(),
                GeneroService.getAllGeneros(),
                CategoriaService.getAllCategorias()
            ]);
            
            setMarcas(marcasRes.data || marcasRes);
            setGeneros(generosRes.data || generosRes);
            setCategorias(categoriasRes.data || categoriasRes);
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.startsWith('marca.') || name.startsWith('genero.') || name.startsWith('categoria.')) {
            const field = name.split('.')[0];
            setFormData(prev => ({
                ...prev,
                [field]: { id: value || '' }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecciona un archivo de imagen válido');
                return;
            }

            // Validar tamaño (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('La imagen no debe superar los 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(prev => ({
                    ...prev,
                    [type]: reader.result
                }));
                setFormData(prev => ({
                    ...prev,
                    [type === 'principal' ? 'imgPrincipal' : 
                     type === 'secundaria' ? 'imgSecundaria' : 'imgExtra']: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
        if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';
        if (!formData.precio || formData.precio <= 0) newErrors.precio = 'El precio debe ser mayor a 0';
        if (!formData.stock || formData.stock < 0) newErrors.stock = 'El stock no puede ser negativo';
        if (formData.descuento < 0 || formData.descuento > 100) newErrors.descuento = 'El descuento debe estar entre 0 y 100';
        if (!formData.imgPrincipal) newErrors.imgPrincipal = 'La imagen principal es requerida';
        if (!formData.marca.id) newErrors.marca = 'La marca es requerida';
        if (!formData.genero.id) newErrors.genero = 'El género es requerida';
        if (!formData.categoria.id) newErrors.categoria = 'La categoría es requerida';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            alert('Por favor, corrige los errores en el formulario');
            return;
        }

        setSubmitting(true);
        try {
            const productData = {
                ...formData,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                descuento: parseInt(formData.descuento),
                marca: formData.marca.id ? { idMarca: parseInt(formData.marca.id) } : null,
                genero: formData.genero.id ? { idGenero: parseInt(formData.genero.id) } : null,
                categoria: formData.categoria.id ? { idCategoria: parseInt(formData.categoria.id) } : null
            };

            await ProductoService.createProducto(productData);
            alert('Producto creado exitosamente');
            navigate('/Admin/HomeAdmin');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Error al crear el producto. Por favor, intenta nuevamente.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('¿Estás seguro de que quieres cancelar? Los cambios no guardados se perderán.')) {
            navigate('/Admin/HomeAdmin');
        }
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <TextAtom variant="p">Cargando formulario...</TextAtom>
            </div>
        );
    }

    return (
        <div className="add-product-page">
            {/* Header */}
            <div className="admin-header">
                <div className="admin-title-section">
                    <TextAtom variant="h1" className="admin-title">
                        Agregar Nuevo Producto
                    </TextAtom>
                    <TextAtom variant="p" className="admin-subtitle">
                        Completa la información del producto
                    </TextAtom>
                </div>
                <div className="admin-buttons">
                    <button 
                        className="admin-btn secondary"
                        onClick={handleCancel}
                        disabled={submitting}
                    >
                        <TextAtom variant="span">Cancelar</TextAtom>
                    </button>
                    <button 
                        className="admin-btn primary"
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        <TextAtom variant="span">
                            {submitting ? 'Guardando...' : 'Guardar Producto'}
                        </TextAtom>
                    </button>
                </div>
            </div>

            {/* Formulario */}
            <div className="product-form-container">
                <form className="product-form" onSubmit={handleSubmit}>
                    {/* Información Básica */}
                    <div className="form-section">
                        <TextAtom variant="h3" className="section-title">
                            📋 Información Básica
                        </TextAtom>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <TextAtom variant="label" htmlFor="nombre" className="form-label">
                                    Nombre del Producto *
                                </TextAtom>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    className={`form-input ${errors.nombre ? 'error' : ''}`}
                                    placeholder="Ej: Zapatillas Running Ultra"
                                />
                                {errors.nombre && (
                                    <TextAtom variant="span" className="error-message">
                                        {errors.nombre}
                                    </TextAtom>
                                )}
                            </div>

                            <div className="form-group full-width">
                                <TextAtom variant="label" htmlFor="descripcion" className="form-label">
                                    Descripción *
                                </TextAtom>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                    className={`form-textarea ${errors.descripcion ? 'error' : ''}`}
                                    placeholder="Describe las características principales del producto..."
                                    rows="4"
                                />
                                {errors.descripcion && (
                                    <TextAtom variant="span" className="error-message">
                                        {errors.descripcion}
                                    </TextAtom>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Precio y Stock */}
                    <div className="form-section">
                        <TextAtom variant="h3" className="section-title">
                            💰 Precio y Inventario
                        </TextAtom>
                        <div className="form-grid">
                            <div className="form-group">
                                <TextAtom variant="label" htmlFor="precio" className="form-label">
                                    Precio *
                                </TextAtom>
                                <div className="input-with-symbol">
                                    <TextAtom variant="span" className="input-symbol">$</TextAtom>
                                    <input
                                        type="number"
                                        id="precio"
                                        name="precio"
                                        value={formData.precio}
                                        onChange={handleInputChange}
                                        className={`form-input ${errors.precio ? 'error' : ''}`}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                {errors.precio && (
                                    <TextAtom variant="span" className="error-message">
                                        {errors.precio}
                                    </TextAtom>
                                )}
                            </div>

                            <div className="form-group">
                                <TextAtom variant="label" htmlFor="stock" className="form-label">
                                    Stock *
                                </TextAtom>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    className={`form-input ${errors.stock ? 'error' : ''}`}
                                    placeholder="0"
                                    min="0"
                                />
                                {errors.stock && (
                                    <TextAtom variant="span" className="error-message">
                                        {errors.stock}
                                    </TextAtom>
                                )}
                            </div>

                            <div className="form-group">
                                <TextAtom variant="label" htmlFor="descuento" className="form-label">
                                    Descuento (%)
                                </TextAtom>
                                <input
                                    type="number"
                                    id="descuento"
                                    name="descuento"
                                    value={formData.descuento}
                                    onChange={handleInputChange}
                                    className={`form-input ${errors.descuento ? 'error' : ''}`}
                                    placeholder="0"
                                    min="0"
                                    max="100"
                                />
                                {errors.descuento && (
                                    <TextAtom variant="span" className="error-message">
                                        {errors.descuento}
                                    </TextAtom>
                                )}
                            </div>

                            {formData.descuento > 0 && (
                                <div className="form-group">
                                    <TextAtom variant="label" className="form-label">
                                        Precio con Descuento
                                    </TextAtom>
                                    <div className="price-display">
                                        <TextAtom variant="strong" className="final-price">
                                            ${(formData.precio * (1 - formData.descuento / 100)).toFixed(2)}
                                        </TextAtom>
                                        <TextAtom variant="span" className="original-price">
                                            ${parseFloat(formData.precio).toFixed(2)}
                                        </TextAtom>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Categorización */}
                    <div className="form-section">
                        <TextAtom variant="h3" className="section-title">
                            🏷️ Categorización
                        </TextAtom>
                        <div className="form-grid">
                            <div className="form-group">
                                <TextAtom variant="label" htmlFor="marca" className="form-label">
                                    Marca *
                                </TextAtom>
                                <select
                                    id="marca"
                                    name="marca.id"
                                    value={formData.marca.id}
                                    onChange={handleInputChange}
                                    className={`form-select ${errors.marca ? 'error' : ''}`}
                                >
                                    <option value="">Seleccionar marca</option>
                                    {marcas.map(marca => (
                                        <option key={marca.idMarca} value={marca.idMarca}>
                                            {marca.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.marca && (
                                    <TextAtom variant="span" className="error-message">
                                        {errors.marca}
                                    </TextAtom>
                                )}
                            </div>

                            <div className="form-group">
                                <TextAtom variant="label" htmlFor="genero" className="form-label">
                                    Género *
                                </TextAtom>
                                <select
                                    id="genero"
                                    name="genero.id"
                                    value={formData.genero.id}
                                    onChange={handleInputChange}
                                    className={`form-select ${errors.genero ? 'error' : ''}`}
                                >
                                    <option value="">Seleccionar género</option>
                                    {generos.map(genero => (
                                        <option key={genero.idGenero} value={genero.idGenero}>
                                            {genero.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.genero && (
                                    <TextAtom variant="span" className="error-message">
                                        {errors.genero}
                                    </TextAtom>
                                )}
                            </div>

                            <div className="form-group">
                                <TextAtom variant="label" htmlFor="categoria" className="form-label">
                                    Categoría *
                                </TextAtom>
                                <select
                                    id="categoria"
                                    name="categoria.id"
                                    value={formData.categoria.id}
                                    onChange={handleInputChange}
                                    className={`form-select ${errors.categoria ? 'error' : ''}`}
                                >
                                    <option value="">Seleccionar categoría</option>
                                    {categorias.map(cat => (
                                        <option key={cat.idCategoria} value={cat.idCategoria}>
                                            {cat.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoria && (
                                    <TextAtom variant="span" className="error-message">
                                        {errors.categoria}
                                    </TextAtom>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Imágenes */}
                    <div className="form-section">
                        <TextAtom variant="h3" className="section-title">
                            🖼️ Imágenes del Producto
                        </TextAtom>
                        
                        {/* Imagen Principal */}
                        <div className="image-upload-group">
                            <TextAtom variant="label" className="form-label">
                                Imagen Principal *
                            </TextAtom>
                            <div className="image-upload-container">
                                <div className="image-preview">
                                    {imagePreview.principal ? (
                                        <img src={imagePreview.principal} alt="Vista previa principal" />
                                    ) : (
                                        <div className="image-placeholder">
                                            <TextAtom variant="span">📷</TextAtom>
                                            <TextAtom variant="p">Vista previa</TextAtom>
                                        </div>
                                    )}
                                </div>
                                <div className="upload-controls">
                                    <input
                                        type="file"
                                        id="imgPrincipal"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 'principal')}
                                        className="file-input"
                                    />
                                    <TextAtom variant="label" htmlFor="imgPrincipal" className="upload-btn">
                                        Seleccionar Imagen
                                    </TextAtom>
                                    <TextAtom variant="p" className="upload-hint">
                                        Recomendado: 500x500px, max 5MB
                                    </TextAtom>
                                </div>
                            </div>
                            {errors.imgPrincipal && (
                                <TextAtom variant="span" className="error-message">
                                    {errors.imgPrincipal}
                                </TextAtom>
                            )}
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="admin-btn secondary large"
                            onClick={handleCancel}
                            disabled={submitting}
                        >
                            <TextAtom variant="span">Cancelar</TextAtom>
                        </button>
                        <button
                            type="submit"
                            className="admin-btn primary large"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <div className="mini-spinner"></div>
                                    <TextAtom variant="span">Guardando...</TextAtom>
                                </>
                            ) : (
                                <TextAtom variant="span">Guardar Producto</TextAtom>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;