// src/components/sections/hero.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação

function Hero() {
  const navigate = useNavigate(); // Instancia o hook para ser usado nos botões

  return (
    // 🛑 CORREÇÃO AQUI: Mudei de 'py-8' para 'py-4' para diminuir o espaço vertical do topo
    <section className="surface-0 px-4 py-4 md:px-8">
      <div className="grid align-items-center">

        {/* Coluna Esquerda: Texto e Botões */}
        <div className="col-12 md:col-6">
          <span className="inline-block px-3 py-1 border-round-3xl border-1 surface-border text-xs font-bold text-600 mb-4">
            Educação conectada · Brasil
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mt-0 mb-4 line-height-1">
            Conectando a <br/>
            <span style={{ color: 'var(--brand-blue)' }}>educação</span>
            <span style={{ color: 'var(--brand-green)' }}> no </span>
            <span style={{ color: 'var(--brand-orange)' }}>Brasil</span>
          </h1>

          <p className="text-lg text-600 mb-5">
            ReLigaTodo une alunos, professores e polos físicos numa plataforma
            única — com plantão de dúvidas ao vivo, controle de carga horária e
            avaliação presencial blindada contra fraude.
          </p>

          {/* ÁREA DOS BOTÕES COM A NAVEGAÇÃO CORRETA */}
          <div className="mt-8 flex flex-wrap gap-3">
            
            {/* 
              * BOTÃO 1: "Entrar / Cadastrar"
              * Cor Azul. Ao ser clicado, leva o usuário para a página de Login (/login).
              */}
            <button
              onClick={() => navigate('/login')}
              className="btn-interativo px-4 py-2 border-round-3xl border-none cursor-pointer text-white font-medium shadow-2"
              style={{ backgroundColor: 'var(--brand-blue)' }}
            >
              Entrar / Cadastrar
            </button>

            {/* 
              * BOTÃO 2: "Acessar plataforma"
              * Cor Branca com borda cinza. Ao ser clicado, leva o usuário para a página de Cadastro (/cadastro).
              */}
            <button
              onClick={() => navigate('/cadastro')}
              className="btn-interativo px-5 py-3 border-round-3xl border-1 surface-border bg-white text-900 font-medium cursor-pointer shadow-2"
            >
              Acessar plataforma →
            </button>
          </div>
        </div>

        {/* Coluna Direita: Cartão da Logo */}
        <div className="col-12 md:col-6 flex justify-content-center">
          <div className="surface-0 p-5 border-round-2xl surface-border shadow-3 w-full max-w-38rem">
            <img src="/src/assets/religatodo.png" alt="Logo" className="w-full mb-5" />

            {/* Seção das 3 opções (Aluno, Professor, Fiscal) */}
            <div className="flex justify-content-between gap-2">
              <div className="hero-tab tab-aluno flex-1 text-center p-2 border-0 border-round-xl hover-lift">
                <span className="text-xs font-bold transition-colors">Aluno</span>
              </div>
              <div className="hero-tab tab-professor flex-1 text-center p-2 border-0 border-round-xl hover-lift">
                <span className="text-xs font-bold transition-colors">Professor</span>
              </div>
              <div className="hero-tab tab-fiscal flex-1 text-center p-2 border-0 border-round-xl hover-lift">
                <span className="text-xs font-bold transition-colors">Fiscal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🛑 CORREÇÃO AQUI: Removi os 20 <br /> inúteis que estavam aqui. O grid já cuida do espaçamento. */}
<br />
      {/* SEÇÃO: NOSSA MISSÃO */}
      {/* 🛑 CORREÇÃO AQUI: Mudei 'mt-9' para 'mt-5' para subir a seção "Nossa Missão" */}
      <div id="missao" className="mt-5 col-12 md:col-6" style={{ scrollMarginTop: '100px' }}>
        <span 
          style={{ backgroundColor: 'var(--brand-orange)' }}
          className="inline-block px-3 py-1 text-white border-round-md text-xs font-bold mb-4"
        >
          N O S S A · M I S S Ã O
        </span>
        <h1 className="text-5xl md:text-5xl font-bold mb-4 line-height-1">
          O <span style={{ color: 'var(--brand-blue)' }}> Resgate</span> de 
          <span style={{ color: 'var(--brand-green)' }}> todo</span> conhecimento
          <span style={{ color: 'var(--brand-orange)' }}> Liga</span> quem ensina a quem precisa aprender.
        </h1>
        <p className="mt-4 text-base text-600 line-height-3 md:text-lg">
          Construímos pontes entre escolas, professores e estudantes — com tecnologia simples, humana e brasileira.
        </p>
      </div>

      <br /><br /> {/* Deixei apenas 2 quebras para separar visualmente a Missão dos Cartões */}

      {/* SEÇÃO: 3 CARTÕES COLORIDOS */}
      <div className="flex justify-content-between gap-3">
        <article 
          className="flex-1 p-4 border-round-2xl shadow-3 text-white flex align-items-center gap-4 hover-lift"
          style={{ backgroundColor: 'var(--brand-blue)' }}
        >
          <h3 className="m-0 text-xl font-semibold" style={{ minWidth: '90px' }}>Acesso</h3>
          <p className="m-0 text-sm line-height-3 text-white-alpha-90">
            Educação de qualidade que atravessa qualquer CEP — do centro da cidade ao interior mais distante.
          </p>
        </article>

        <article 
          className="flex-1 p-4 border-round-2xl shadow-3 text-white flex align-items-center gap-4 hover-lift"
          style={{ backgroundColor: 'var(--brand-green)' }}
        >
          <h3 className="m-0 text-xl font-semibold" style={{ minWidth: '90px' }}>Qualidade</h3>
          <p className="m-0 text-sm line-height-3 text-white-alpha-90">
            Trilha de aprendizado com player anti-pulo, vitrine de professores e plantão de dúvidas ao vivo.
          </p>
        </article>
        
        <article 
          className="flex-1 p-4 border-round-2xl shadow-3 text-white flex align-items-center gap-4 hover-lift"
          style={{ backgroundColor: 'var(--brand-orange)' }}
        >
          <h3 className="m-0 text-xl font-semibold" style={{ minWidth: '90px' }}>Inclusão</h3>
          <p className="m-0 text-sm line-height-3 text-white-alpha-90">
            Fila prioritária e interface limpa para estudantes com TEA e TDAH, legendas automáticas e atendimento dedicado.
          </p>
        </article>
      </div>
      {/* Removi os últimos 3 <br /> que sobravam */}
    </section>
  );
}

export default Hero;