// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  // 🆕 Estado para controlar o hover da palavra "Cadastre-se"
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        senha
      });
      
      localStorage.setItem('userId', response.data.id);
      navigate('/painel');
    } catch (error) {
      let mensagemErro = "Credenciais inválidas ou erro no servidor.";
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          mensagemErro = error.response.data;
        } else {
          mensagemErro = JSON.stringify(error.response.data);
        }
      }
      alert('Erro ao fazer login: ' + mensagemErro);
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen surface-ground">
      <div className="surface-0 border-1 border-round-3xl p-6 w-full md:w-30rem m-4 shadow-1" style={{ borderColor: '#e2e8f0' }}>
        <div className="text-xs font-bold uppercase text-blue-600 mb-2" style={{ letterSpacing: '0.18em' }}>
          Acessar conta
        </div>
        <h1 className="m-0 text-2xl font-bold text-900 mb-2">Bem‑vindo de volta</h1>
        <p className="m-0 text-sm text-600 mb-5 line-height-3">
          Informe seu email e senha para continuar.
        </p>

        <form onSubmit={handleLogin} className="flex flex-column gap-3 mb-5">
          <div className="flex flex-column gap-1">
            <label className="text-xs font-semibold text-600 uppercase" style={{ letterSpacing: '0.12em' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border-1 border-solid border-round-lg outline-none focus:border-blue-500 transition-colors text-900 bg-transparent"
              style={{ borderColor: '#e2e8f0' }}
            />
          </div>

          <div className="flex flex-column gap-1">
            <label className="text-xs font-semibold text-600 uppercase" style={{ letterSpacing: '0.12em' }}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full p-2 border-1 border-solid border-round-lg outline-none focus:border-blue-500 transition-colors text-900 bg-transparent"
              style={{ borderColor: '#e2e8f0' }}
            />
          </div>

          {/* Botão Principal */}
          <button
            type="submit"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="w-full py-2 px-4 border-round-3xl border-none cursor-pointer text-white font-semibold text-sm transition-all"
            style={{
              backgroundColor: isButtonHovered ? '#1e40af' : 'var(--brand-blue, #2563eb)',
              transform: isButtonHovered ? 'scale(1.02)' : 'scale(1)',
              transition: 'background-color 0.2s ease, transform 0.2s ease'
            }}
          >
            Entrar
          </button>
        </form>

        {/* 🟠 Apenas a palavra "Cadastre-se" é clicável e fica LARANJA no hover */}
        <p className="w-full mt-2 bg-transparent text-center text-xs text-600">
          Não tem uma conta?{' '}
          <span
            onClick={() => navigate('/cadastro')}
            onMouseEnter={() => setIsLinkHovered(true)}
            onMouseLeave={() => setIsLinkHovered(false)}
            style={{
              color: isLinkHovered ? 'var(--brand-orange)' : 'var(--foreground)',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'color 0.2s ease'
            }}
          >
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}