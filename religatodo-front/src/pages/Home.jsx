// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Função principal da página inicial (Landing Page)
export default function Home() {
  // Hook para navegar entre as páginas do sistema
  const navigate = useNavigate();

  return (
    // Container centralizado que ocupa a tela toda (min-h-screen)
    <div className="flex flex-column align-items-center justify-content-center min-h-screen surface-ground text-900 font-sans p-4 text-center">
      
      {/* Título principal da aplicação */}
      <h1 className="text-4xl font-extrabold mb-2">🚀 ReLigaTodo</h1>
      
      {/* Texto de descrição do projeto */}
      <p className="text-600 max-w-30rem mb-5 line-height-3">
        Bem-vindo ao ReLigaTodo! Esta é a página inicial da plataforma. 
        Utilize os botões abaixo para acessar o cadastro ou o painel do aluno.
      </p>
      
      {/* Container dos botões de ação */}
      <div className="flex gap-3">
        
        {/* Botão para ir para a tela de Cadastro */}
        <button 
          onClick={() => navigate('/cadastro')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-5 py-3 border-none border-round-3xl cursor-pointer transition-colors shadow-1"
        >
          Ir para o Cadastro →
        </button>
        
        {/* Botão para acessar o Painel (caso o usuário já esteja logado) */}
        <button 
          onClick={() => navigate('/painel')}
          className="bg-transparent hover:bg-100 text-900 border-1 font-bold px-5 py-3 border-round-3xl cursor-pointer transition-colors"
          style={{ borderColor: 'var(--border)' }}
        >
          Acessar o Painel
        </button>
        
      </div>
    </div>
  );
}