export const loginData = [
  {
    type: "text",
    text: [
      {
        content: "Inicio de Sesión",
        variant: "h1",
        className: "auth-title",
      },
    ],
  },
  {
    type: "inputs",
    inputs: [
      {
        type: "email",
        placeholder: "Correo Electrónico",
        name: "email",
        required: true,
        autoComplete: "off",
        className: "auth-input",
      },
      {
        type: "password",
        placeholder: "Contraseña",
        name: "clave",
        required: true,
        autoComplete: "current-password",
        className: "auth-input",
      },
    ],
    className: "space-y-6",
  },
  {
    type: "button",
    text: "Iniciar Sesión",
    className: "auth-button",
  },
];

export const registerData = [
  {
    type: "text",
    text: [
      {
        content: "Crear Cuenta",
        variant: "h1",
        className: "auth-title",
      },
    ],
  },
  {
    type: "inputs",
    inputs: [
      {
        type: "text",
        placeholder: "Nombre",
        name: "nombre",
        required: true,
        className: "auth-input",
      },
      {
        type: "email",
        placeholder: "Correo Electrónico",
        name: "email",
        required: true,
        autoComplete: "off",
        className: "auth-input",
      },
      {
        type: "password",
        placeholder: "Contraseña",
        name: "clave",
        required: true,
        autoComplete: "new-password",
        className: "auth-input",
      },
    ],
    className: "space-y-6",
  },
  {
    type: "button",
    text: "Registrarse",
    className: "auth-button",
  },
];
