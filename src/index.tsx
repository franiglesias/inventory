import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./driving/forManagingProducts/spa/App";

// Punto de entrada para la aplicación React
const container = document.getElementById('root');

if (!container) {
  throw new Error('No se encontró el elemento con id "root"');
}

// Inicializar la aplicación React
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
