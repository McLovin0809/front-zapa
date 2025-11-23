import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';
import UsuarioService from '../../services/UsuarioService';
import TextAtom from '../../components/atoms/TextAtom';
import '../../style/pages/HomeAdmin.css';

const AdminHome = () => {
    const [activeTab, setActiveTab] = useState('productos');
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(false);
    const [stats, setStats] = useState({
        totalProductos: 0,
        totalUsuarios: 0,
        productosBajoStock: 0,
        productosConDescuento: 0,
        usuariosActivos: 0,
        administradores: 0
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
        const productosBajoStock = productos.filter(p => p.stock < 10).length;
        const productosConDescuento = productos.filter(p => p.descuento > 0).length;
        const usuariosActivos = usuarios.filter(u => u.activo !== false).length;
        const administradores = usuarios.filter(u => u.rol && u.rol.id === 1).length;
        
        setStats({
            totalProductos: productos.length,
            totalUsuarios: usuarios.length,
            productosBajoStock,
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
            
            // Actualizar estado local
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
            
            // Actualizar estado local
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

    const getRolNombre = (rolId) => {
        const roles = {
            1: 'Administrador',
            2: 'Empleado', 
            3: 'Cliente',
            4: 'Invitado',
            5: 'Cliente' // Asumiendo que 5 también es cliente
        };
        return roles[rolId] || 'Cliente';
    };

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
            {/* Header */}
            <div className="admin-header">
                <div className="admin-title-section">
                    <h1 className="admin-title">Panel de Administración</h1>
                    <p className="admin-subtitle">Gestión completa de la tienda</p>
                </div>
                <div className="admin-buttons">
                    <Link to="/admin/products/new" className="admin-btn primary">
                        + Nuevo Producto
                    </Link>
                    <button className="admin-btn secondary" onClick={() => { fetchProductos(); fetchUsuarios(); }}>
                        Actualizar Todo
                    </button>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="stats-cards">
                <div className="stat-card">
                    <div className="stat-icon products">🛍️</div>
                    <div className="stat-info">
                        <h3 className="stat-number">{stats.totalProductos}</h3>
                        <p className="stat-text">Total Productos</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon users">👥</div>
                    <div className="stat-info">
                        <h3 className="stat-number">{stats.totalUsuarios}</h3>
                        <p className="stat-text">Usuarios Totales</p>
                    </div>
                </div>

            </div>

            {/* Navegación por Pestañas */}
            <div className="admin-tabs">
                <button 
                    className={`tab-button ${activeTab === 'productos' ? 'active' : ''}`}
                    onClick={() => setActiveTab('productos')}
                >
                    📦 Productos ({productos.length})
                </button>
                <button 
                    className={`tab-button ${activeTab === 'usuarios' ? 'active' : ''}`}
                    onClick={() => setActiveTab('usuarios')}
                >
                    👥 Usuarios ({usuarios.length})
                </button>
                <button 
                    className={`tab-button ${activeTab === 'estadisticas' ? 'active' : ''}`}
                    onClick={() => setActiveTab('estadisticas')}
                >
                    📊 Estadísticas
                </button>
            </div>

            {/* Contenido de las Pestañas */}
            <div className="tab-content">
                {/* Pestaña de Productos */}
                {activeTab === 'productos' && (
                    <div className="products-tab">
                        <div className="table-header">
                            <h3>Gestión de Productos</h3>
                            <Link to="/admin/products/new" className="admin-btn primary small">
                                + Agregar Producto
                            </Link>
                        </div>
                        <div className="table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Descuento</th>
                                        <th>Marca</th>
                                        <th>Género</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map(producto => (
                                        <tr key={producto.idProducto}>
                                            <td>
                                                <img 
                                                    src={producto.imgPrincipal} 
                                                    alt={producto.nombre}
                                                    className="product-thumb"
                                                />
                                            </td>
                                            <td>
                                                <div className="product-name-cell">
                                                    <strong>{producto.nombre}</strong>
                                                    <small>{producto.descripcion}</small>
                                                </div>
                                            </td>
                                            <td>
                                                ${producto.descuento > 0 ? 
                                                    calcularPrecioConDescuento(producto.precio, producto.descuento) : 
                                                    producto.precio
                                                }
                                                {producto.descuento > 0 && (
                                                    <div className="original-price">
                                                        ${producto.precio}
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <span className={`stock-badge ${producto.stock < 10 ? 'low' : 'good'}`}>
                                                    {producto.stock}
                                                </span>
                                            </td>
                                            <td>
                                                {producto.descuento > 0 ? (
                                                    <span className="discount-badge">
                                                        -{producto.descuento}%
                                                    </span>
                                                ) : (
                                                    <span className="no-discount">-</span>
                                                )}
                                            </td>
                                            <td>{producto.marca?.nombre || '-'}</td>
                                            <td>{producto.genero?.nombre || '-'}</td>
                                            <td>
                                                <span className={`status-badge ${producto.stock > 0 ? 'active' : 'inactive'}`}>
                                                    {producto.stock > 0 ? 'Activo' : 'Agotado'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <Link 
                                                        to={`/admin/products/edit/${producto.idProducto}`}
                                                        className="btn-action edit"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDeleteProducto(producto.idProducto)}
                                                        className="btn-action delete"
                                                    >
                                                        Eliminar
                                                    </button>
                                                    <Link 
                                                        to={`/producto/${producto.idProducto}`}
                                                        className="btn-action view"
                                                    >
                                                        Ver
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {productos.length === 0 && (
                            <div className="no-data">
                                <TextAtom variant="h3">No hay productos</TextAtom>
                                <TextAtom variant="p">Comienza agregando nuevos productos a tu catálogo.</TextAtom>
                                <Link to="/admin/products/new" className="admin-btn primary">
                                    Agregar Primer Producto
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Pestaña de Usuarios */}
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

                {/* Pestaña de Estadísticas */}
                {activeTab === 'estadisticas' && (
                    <div className="stats-tab">
                        <div className="stats-grid">
                            <div className="stat-card-large">
                                <h3>📦 Resumen de Productos</h3>
                                <div className="stat-details">
                                    <div className="stat-item">
                                        <span>Total productos:</span>
                                        <strong>{stats.totalProductos}</strong>
                                    </div>
                                    <div className="stat-item">
                                        <span>Bajo stock (10 unidades):</span>
                                        <strong className="warning">{stats.productosBajoStock}</strong>
                                    </div>
                                    <div className="stat-item">
                                        <span>Con descuento:</span>
                                        <strong className="discount">{stats.productosConDescuento}</strong>
                                    </div>
                                    <div className="stat-item">
                                        <span>Agotados:</span>
                                        <strong className="danger">
                                            {productos.filter(p => p.stock === 0).length}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <div className="stat-card-large">
                                <h3>👥 Resumen de Usuarios</h3>
                                <div className="stat-details">
                                    <div className="stat-item">
                                        <span>Total usuarios:</span>
                                        <strong>{stats.totalUsuarios}</strong>
                                    </div>
                                    <div className="stat-item">
                                        <span>Usuarios activos:</span>
                                        <strong className="success">{stats.usuariosActivos}</strong>
                                    </div>
                                    <div className="stat-item">
                                        <span>Administradores:</span>
                                        <strong className="admin">{stats.administradores}</strong>
                                    </div>
                                    <div className="stat-item">
                                        <span>Usuarios inactivos:</span>
                                        <strong className="danger">
                                            {usuarios.filter(u => u.activo === false).length}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <div className="stat-card-large">
                                <h3>🏷️ Distribución por Marca</h3>
                                <div className="stat-details">
                                    {Object.entries(
                                        productos.reduce((acc, producto) => {
                                            const marca = producto.marca?.nombre || 'Sin marca';
                                            acc[marca] = (acc[marca] || 0) + 1;
                                            return acc;
                                        }, {})
                                    ).map(([marca, count]) => (
                                        <div key={marca} className="stat-item">
                                            <span>{marca}:</span>
                                            <strong>{count}</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="stat-card-large">
                                <h3>🚻 Distribución por Género</h3>
                                <div className="stat-details">
                                    {Object.entries(
                                        productos.reduce((acc, producto) => {
                                            const genero = producto.genero?.nombre || 'Sin género';
                                            acc[genero] = (acc[genero] || 0) + 1;
                                            return acc;
                                        }, {})
                                    ).map(([genero, count]) => (
                                        <div key={genero} className="stat-item">
                                            <span>{genero}:</span>
                                            <strong>{count}</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="stat-card-large">
                                <h3>👑 Distribución por Rol</h3>
                                <div className="stat-details">
                                    {Object.entries(
                                        usuarios.reduce((acc, usuario) => {
                                            const rol = getRolNombre(usuario.rol?.id);
                                            acc[rol] = (acc[rol] || 0) + 1;
                                            return acc;
                                        }, {})
                                    ).map(([rol, count]) => (
                                        <div key={rol} className="stat-item">
                                            <span>{rol}:</span>
                                            <strong>{count}</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminHome;