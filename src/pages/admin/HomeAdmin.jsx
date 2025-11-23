import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';
import UsuarioService from '../../services/UsuarioService';
import Section from '../../components/templates/Section';
import TextAtom from '../../components/atoms/TextAtom';

import { headerData } from '../../data/admin/headerData';
import { getStatsData } from '../../data/admin/statsData';
import { getProductsData } from '../../data/admin/productsData';
import { getTabsData } from '../../data/admin/tabsData';

import '../../style/pages/HomeAdmin.css'

const AdminHome = () => {
    const [activeTab, setActiveTab] = useState('productos');
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(false);
    const [stats, setStats] = useState({
        totalProductos: 0,
        totalUsuarios: 0
    });

    useEffect(() => {
        fetchProductos();
        fetchUsuarios();
    }, []);

    useEffect(() => {
        if (productos.length > 0 && usuarios.length > 0) {
            calculateStats();
        }
    }, [productos, usuarios]);

    const fetchProductos = () => {
        ProductoService.getAllProductos().then(response => {
            setProductos(response.data);
            setLoading(false);
        }).catch(error => {
            console.log('Error fetching productos:', error);
            setLoading(false);
        });
    };

    const fetchUsuarios = () => {
        setUserLoading(true);
        UsuarioService.getAllUsuarios().then(response => {
            setUsuarios(response.data);
            setUserLoading(false);
        }).catch(error => {
            console.log('Error fetching usuarios:', error);
            setUserLoading(false);
        });
    };

    const calculateStats = () => {
        setStats({
            totalProductos: productos.length,
            totalUsuarios: usuarios.length
        });
    };

    const handleDeleteProducto = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await ProductoService.deleteProducto(id);
                setProductos(productos.filter(p => p.idProducto !== id));
                alert('Producto eliminado correctamente');
            } catch (error) {
                alert('Error al eliminar el producto');
            }
        }
    };

    const handleDeleteUsuario = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                await UsuarioService.deleteUsuario(id);
                setUsuarios(usuarios.filter(u => u.idUsuario !== id));
                alert('Usuario eliminado correctamente');
            } catch (error) {
                alert('Error al eliminar el usuario');
            }
        }
    };

    const handleToggleUsuarioActivo = async (usuario) => {
        try {
            const nuevosDatos = {
                activo: !usuario.activo
            };
            await UsuarioService.updateUsuarioParcial(usuario.idUsuario, nuevosDatos);
            
            setUsuarios(usuarios.map(u => 
                u.idUsuario === usuario.idUsuario 
                    ? { ...u, activo: !usuario.activo }
                    : u
            ));
            alert(`Usuario ${!usuario.activo ? 'activado' : 'desactivado'} correctamente`);
        } catch (error) {
            alert('Error al actualizar el usuario');
        }
    };

    const handleCambiarRol = async (usuario, nuevoRolId) => {
        try {
            const nuevosDatos = {
                rol: { id: nuevoRolId }
            };
            await UsuarioService.updateUsuarioParcial(usuario.idUsuario, nuevosDatos);
            
            setUsuarios(usuarios.map(u => 
                u.idUsuario === usuario.idUsuario 
                    ? { ...u, rol: { ...u.rol, id: nuevoRolId } }
                    : u
            ));
            alert('Rol actualizado correctamente');
        } catch (error) {
            alert('Error al cambiar el rol del usuario');
        }
    };

    const calcularPrecioConDescuento = (precio, descuento) => {
        return (precio * (1 - descuento / 100)).toFixed(2);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('es-ES');
    };

    // Obtener datos desde archivos externos
    const headerContent = [headerData];
    const statsContent = getStatsData(stats);
    const productsContent = getProductsData(productos, calcularPrecioConDescuento);
    const tabsData = getTabsData(productos, usuarios);

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <p>Cargando panel de administración...</p>
            </div>
        );
    }

    return (
        <div className="admin-page">
            {/* header con section */}
            <div className="admin-header">
                <Section content={headerContent} />
                <div className="admin-buttons">
                    <Link to="/admin/products/new" className="admin-btn primary">
                        + Nuevo Producto
                    </Link>
                    <button className="admin-btn secondary" onClick={() => { fetchProductos(); fetchUsuarios(); }}>
                        Actualizar Todo
                    </button>
                </div>
            </div>

            {/* estadisticas con section */}
            <Section content={statsContent} />

            {/* navegacion por Pestañas */}
            <div className="admin-tabs">
                {tabsData.map(tab => (
                    <button 
                        key={tab.value}
                        className={`tab-button ${activeTab === tab.value ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.value)}
                    >
                        {tab.label} {tab.count !== null && `(${tab.count})`}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {activeTab === 'productos' && (
                    <div className="products-tab">
                        <Section content={productsContent} />
                        
                        {productos.length === 0 && (
                            <div className="no-productos">
                                <TextAtom variant="h3" className="no-productos-title">
                                    No hay productos disponibles
                                </TextAtom>
                                <TextAtom variant="p" className="no-productos-text">
                                    Comienza agregando nuevos productos a tu catálogo.
                                </TextAtom>
                                <Link to="/admin/products/new" className="admin-btn primary">
                                    Agregar Primer Producto
                                </Link>
                            </div>
                        )}

                        <div className="productos-contador">
                            <TextAtom variant="p" className="contador-text">
                                Mostrando {productos.length} producto{productos.length !== 1 ? 's' : ''} en el catálogo
                            </TextAtom>
                        </div>
                    </div>
                )}

                {activeTab === 'usuarios' && (
                    <div className="users-tab">
                        <div className="table-header">
                            <h3>Gestión de Usuarios</h3>
                            <div className="table-actions">
                                <button className="admin-btn secondary small" onClick={fetchUsuarios} disabled={userLoading}>
                                    {userLoading ? 'Cargando...' : 'Actualizar'}
                                </button>
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Rol</th>
                                        <th>Teléfono</th>
                                        <th>Fecha Registro</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map(usuario => (
                                        <tr key={usuario.idUsuario}>
                                            <td>#{usuario.idUsuario}</td>
                                            <td>
                                                <div className="user-name-cell">
                                                    <strong>{usuario.nombre} {usuario.apellido}</strong>
                                                    <small>@{usuario.nombreUsuario}</small>
                                                </div>
                                            </td>
                                            <td>{usuario.correo}</td>
                                            <td>
                                                <select 
                                                    value={usuario.rol?.id || 3}
                                                    onChange={(e) => handleCambiarRol(usuario, parseInt(e.target.value))}
                                                    className="role-select"
                                                >
                                                    <option value={1}>Administrador</option>
                                                    <option value={2}>Empleado</option>
                                                    <option value={3}>Cliente</option>
                                                    <option value={4}>Invitado</option>
                                                </select>
                                            </td>
                                            <td>{usuario.telefono || '-'}</td>
                                            <td>{formatDate(usuario.fechaCreacion)}</td>
                                            <td>
                                                <button 
                                                    onClick={() => handleToggleUsuarioActivo(usuario)}
                                                    className={`status-toggle ${usuario.activo ? 'active' : 'inactive'}`}
                                                >
                                                    {usuario.activo ? 'Activo' : 'Inactivo'}
                                                </button>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <Link 
                                                        to={`/admin/users/edit/${usuario.idUsuario}`}
                                                        className="btn-action edit"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDeleteUsuario(usuario.idUsuario)}
                                                        className="btn-action delete"
                                                    >
                                                        Eliminar
                                                    </button>
                                                    <button className="btn-action view">
                                                        Detalles
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {usuarios.length === 0 && !userLoading && (
                            <div className="no-data">
                                <TextAtom variant="h3">No hay usuarios registrados</TextAtom>
                                <TextAtom variant="p">Los usuarios aparecerán aquí cuando se registren.</TextAtom>
                            </div>
                        )}

                        {userLoading && (
                            <div className="loading-row">
                                <div className="mini-spinner"></div>
                                <span>Cargando usuarios...</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminHome;