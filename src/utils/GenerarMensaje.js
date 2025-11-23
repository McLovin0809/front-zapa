let container = null;

export const generarMensaje = (mensaje, tipo = 'info', duracion = 3000) => {
  // Crear contenedor una sola vez
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // Crear toast
  const toast = document.createElement('div');
  toast.className = getToastClasses(tipo);
  toast.textContent = mensaje;

  // Añadir al contenedor
  container.appendChild(toast);

  // Animación de entrada
  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  // Auto-eliminar
  setTimeout(() => {
    toast.classList.add('toast-hidden');
    toast.addEventListener('transitionend', () => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    });
  }, duracion);
};

// Clases por tipo
const getToastClasses = (tipo) => {
  const base = 'toast-base';
  const colors = {
    success: 'toast-success',
    error: 'toast-error',
    warning: 'toast-warning',
    info: 'toast-info',
  };

  return `${base} ${colors[tipo] || colors.info}`;
};
