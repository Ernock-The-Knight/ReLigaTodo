// src/pages/Cadastro.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Cadastro() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    genero: 'Feminino',
    email: '',
    senha: '',
    cpf: '' 
  });

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  // 🆕 Estado para controlar o hover da palavra "Entrar"
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCadastro = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/cadastro', {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        cpf: formData.cpf
      });

      localStorage.setItem('userId', response.data.id);
      navigate('/painel');
      
    } catch (error) {
      alert('Erro ao cadastrar: ' + (error.response?.data || 'Erro desconhecido'));
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen surface-ground">
      <div className="surface-0 border-1 border-round-3xl p-6 w-full md:w-30rem m-4 shadow-1" style={{ borderColor: '#e2e8f0' }}>
        <div className="text-xs font-bold uppercase text-blue-600 mb-2" style={{ letterSpacing: '0.18em' }}>Criar conta</div>
        <h1 className="m-0 text-2xl font-bold text-900 mb-2">Comece a estudar</h1>
        <p className="m-0 text-sm text-600 mb-5 line-height-3">Nome, CPF e gênero não poderão ser alterados depois.</p>

        {/* Botão Google */}
        <button 
          className="w-full flex align-items-center justify-content-center gap-2 py-2 px-4 border-1 border-round-3xl bg-transparent cursor-pointer text-900 font-semibold text-sm transition-colors hover:surface-100 hover:border-blue-500 focus:border-blue-500 outline-none mb-4 tab-google flex-1 text-center p-2"
          style={{ borderColor: '#e2e8f0' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/>
            <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.48 12c0-.73.13-1.44.36-2.11V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"/>
          </svg>
          Entrar com Google
        </button>

        <div className="flex align-items-center mb-4 gap-3 text-xs text-500">
          <div className="flex-1 border-top-1" style={{ borderColor: '#e2e8f0' }}></div>
          ou com email
          <div className="flex-1 border-top-1" style={{ borderColor: '#e2e8f0' }}></div>
        </div>

        <div className="flex flex-column gap-3 mb-5">
          <div className="flex flex-column gap-1">
            <label className="text-xs font-semibold text-600 uppercase" style={{ letterSpacing: '0.12em' }}>Nome Completo</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="w-full p-2 border-1 border-solid border-round-lg outline-none focus:border-blue-500 transition-colors text-900 bg-transparent" style={{ borderColor: '#e2e8f0' }} />
          </div>
          <div className="flex flex-column gap-1">
            <label className="text-xs font-semibold text-600 uppercase" style={{ letterSpacing: '0.12em' }}>CPF (apenas números)</label>
            <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} maxLength="11" placeholder="Digite apenas os números" className="w-full p-2 border-1 border-solid border-round-lg outline-none focus:border-blue-500 transition-colors text-900 bg-transparent" style={{ borderColor: '#e2e8f0' }} />
          </div>
          <div className="flex flex-column gap-1">
            <label className="text-xs font-semibold text-600 uppercase" style={{ letterSpacing: '0.12em' }}>Gênero</label>
            <select name="genero" value={formData.genero} onChange={handleChange} className="w-full p-2 border-1 border-solid border-round-lg outline-none focus:border-blue-500 transition-colors text-900 bg-transparent appearance-none" style={{ borderColor: '#e2e8f0' }}>
              <option>Feminino</option>
              <option>Masculino</option>
              <option>Não-binário</option>
              <option>Prefiro não dizer</option>
            </select>
          </div>
          <div className="flex flex-column gap-1">
            <label className="text-xs font-semibold text-600 uppercase" style={{ letterSpacing: '0.12em' }}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border-1 border-solid border-round-lg outline-none focus:border-blue-500 transition-colors text-900 bg-transparent" style={{ borderColor: '#e2e8f0' }} />
          </div>
          <div className="flex flex-column gap-1">
            <label className="text-xs font-semibold text-600 uppercase" style={{ letterSpacing: '0.12em' }}>Senha</label>
            <input type="password" name="senha" value={formData.senha} onChange={handleChange} className="w-full p-2 border-1 border-solid border-round-lg outline-none focus:border-blue-500 transition-colors text-900 bg-transparent" style={{ borderColor: '#e2e8f0' }} />
          </div>
        </div>

        {/* Botão Principal */}
        <button 
          onClick={handleCadastro}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className="w-full py-2 px-4 border-round-3xl border-none cursor-pointer text-white font-semibold text-sm transition-all"
          style={{
            backgroundColor: isButtonHovered ? '#1e40af' : 'var(--brand-blue, #2563eb)',
            transform: isButtonHovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'background-color 0.2s ease, transform 0.2s ease'
          }}
        >
          Criar conta e entrar
        </button>

        {/* 🟢 Apenas a palavra "Entrar" é clicável e fica VERDE no hover */}
        <p className="w-full mt-4 bg-transparent text-center text-xs text-600">
          Já tem conta?{' '}
          <span
            onClick={() => navigate('/login')}
            onMouseEnter={() => setIsLinkHovered(true)}
            onMouseLeave={() => setIsLinkHovered(false)}
            style={{
              color: isLinkHovered ? 'var(--brand-green)' : 'var(--foreground)',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'color 0.2s ease'
            }}
          >
            Entrar
          </span>
        </p>
      </div>
    </div>
  );
}