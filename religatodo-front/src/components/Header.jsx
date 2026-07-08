// src/components/Header.jsx
import React from 'react';
// 🛑 CORREÇÃO AQUI: Precisamos importar o useNavigate e o useLocation!
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retorna 'true' para qualquer página interna (diferente da home '/')
  const isNotHome = location.pathname !== '/';

  return (
    <header 
      className="flex align-items-center justify-content-between px-5 py-3 sticky top-0 z-5 border-bottom-1 shadow-2"
      style={{ backgroundColor: 'var(--paper)', borderColor: '#e2e8f0' }}
    >
      
      {/* Clicar na logo sempre leva para o início */}
      <div className="flex align-items-center cursor-pointer" onClick={() => navigate('/')}>
        <img src="/src/assets/religatodo2.png" alt="Logo" height="70" />
      </div>

      <div className="flex align-items-center gap-4">
        {isNotHome ? (
          /* 
           * MODO 1: Páginas Internas
           */
          <button 
            onClick={() => navigate('/')}
            className="btn-voltar flex align-items-center gap-2 px-4 py-2 border-round-3xl border-none cursor-pointer font-medium"
          >
            <i className="pi pi-arrow-left text-sm"></i>
            Voltar para Início
          </button>
        ) : (
          /* MODO 2: Landing Page */
          <>
            <a href="#missao" className="text-900 hover:text-blue-500 transition-colors font-medium no-underline">
              Nossa Missão
            </a>
            <span className="text-400">|</span>
            
            {/* 🟢 BOTÃO ENTRAR - Vai para a rota /login */}
            <button 
              onClick={() => navigate('/login')}
              className="btn-interativo px-4 py-2 border-round-3xl border-none cursor-pointer text-white font-medium shadow-2"
              style={{ backgroundColor: 'var(--brand-green)' }}
            >
              Entrar
            </button>

            {/* 🟠 BOTÃO PRIMEIRO ACESSO - Vai para a rota /cadastro */}
            <button 
              onClick={() => navigate('/cadastro')}
              className="btn-interativo inline-flex px-4 py-2 border-round-3xl border-none cursor-pointer text-white font-medium shadow-2"
              style={{ backgroundColor: 'var(--brand-orange)' }}
            >
              Primeiro Acesso
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;