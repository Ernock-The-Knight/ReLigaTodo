import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './routes/Router'; 

// IMPORTAÇÕES DO PRIMEREACT E PRIMEFLEX
import "primereact/resources/themes/lara-light-green/theme.css"; 
import "primereact/resources/primereact.min.css"; 
import "primeicons/primeicons.css"; 
import "primeflex/primeflex.css";

import { PrimeReactProvider } from "primereact/api"; 

// ESTILOS GLOBAIS
import "./index.css";
import "./App.css"; 

const primeReactConfig = {
  ripple: true,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider value={primeReactConfig}>
      {/* O Roteador agora gerencia toda a árvore da aplicação */}
      <AppRouter />
    </PrimeReactProvider>
  </React.StrictMode>
);