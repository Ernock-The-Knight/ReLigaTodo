// src/pages/PainelAluno.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export function PainelAluno() {
  // Hook para navegar entre páginas (ex: ir para uma matéria)
  const navigate = useNavigate();
  // Hook para saber qual URL o usuário está visitando (usado no menu lateral)
  const location = useLocation();

  // Estados para armazenar os dados que vêm do Back-end
  const [alunoData, setAlunoData] = useState(null);      // Dados do aluno (matrícula, ID, etc.)
  const [matriculas, setMatriculas] = useState([]);      // Lista de matrículas (matérias cursadas)
  const [favoritos, setFavoritos] = useState([]);        // Lista de matérias favoritadas
  const [loading, setLoading] = useState(true);          // Controle de carregamento

  // Pega o ID do usuário que foi salvo no navegador durante o cadastro
  const userId = localStorage.getItem('userId');

  // useEffect roda assim que a tela é aberta (apenas uma vez)
  useEffect(() => {
    // Se não houver usuário logado, para o carregamento e não faz requisições
    if (!userId) {
      setLoading(false);
      return;
    }

    // Função assíncrona para buscar todos os dados do aluno no Back-end
    const fetchDados = async () => {
      try {
        // 1. Busca os dados básicos do aluno (nome, data de matrícula, etc.)
        const resAluno = await axios.get(`http://localhost:8080/api/alunos/meus-dados/${userId}`);
        setAlunoData(resAluno.data);

        // 2. Busca todas as matrículas desse aluno (quais matérias ele está cursando)
        const resMatriculas = await axios.get(`http://localhost:8080/api/matriculas/aluno/${userId}`);
        setMatriculas(resMatriculas.data);

        // 3. Busca a lista de matérias favoritas do aluno
        const resFavoritos = await axios.get(`http://localhost:8080/api/favoritos/aluno/${userId}`);
        setFavoritos(resFavoritos.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };
    fetchDados();
  }, [userId]); // Só executa novamente se o userId mudar

  // Menu lateral dinâmico: cada item tem uma rota e uma classe de hover personalizada
  const menuItens = [
    { label: 'Início', icon: '🏠', rota: '/', classeHover: 'sidebar-opcao' },
    { label: 'Matemática', icon: '📐', rota: '/materia/1', classeHover: 'sidebar-math' },
    { label: 'Biologia', icon: '🧬', rota: '/materia/2', classeHover: 'sidebar-bio' },
    { label: 'Física', icon: '⚛️', rota: '/materia/3', classeHover: 'sidebar-physics' },
    { label: 'História', icon: '🏛️', rota: '/materia/4', classeHover: 'sidebar-history' },
    { label: 'Português', icon: '📖', rota: '/materia/5', classeHover: 'sidebar-portuguese' },
    { label: 'Plantão de dúvidas', icon: '💬', classeHover: 'sidebar-opcao' },
    { label: 'Agendar prova', icon: '🗓️', classeHover: 'sidebar-opcao' },
    { label: 'Meu perfil', icon: '👤', classeHover: 'sidebar-opcao' },
  ].map(item => ({
    ...item,
    // active é true se a URL atual for igual à rota do item (destaca o menu)
    active: location.pathname === item.rota
  }));

  // Filtra apenas as matrículas que já têm um professor escolhido
  const materiasComProfessor = matriculas.filter(mat => mat.professorEscolhido !== null);

  // Enquanto carrega, exibe um texto simples
  if (loading) return <div className="p-5">Carregando painel...</div>;

  return (
    // Container principal: ocupa toda a largura, fundo e fonte definidos no App.css
    <div className="flex w-full surface-ground font-sans text-900">
      
      {/* 
        * SIDEBAR (MENU LATERAL)
        * Em telas pequenas fica oculto (hidden), em telas médias+ aparece (md:flex).
        * sticky top-72px: fica preso no topo abaixo do Header.
        */}
      <aside className="hidden md:flex flex-column w-15rem surface-1 border-right-1 sticky p-4" 
             style={{ height: 'calc(100vh - 72px)', top: '72px', borderColor: 'var(--border)' }}>
        <ul className="list-none p-0 m-0 flex flex-column gap-2">
          {menuItens.map((item, idx) => (
            <li key={idx}>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Evita recarregar a página
                  if (item.rota) navigate(item.rota);
                }}
                className={`flex align-items-center gap-3 px-3 py-2 border-round-lg cursor-pointer text-sm font-medium no-underline sidebar-item ${item.classeHover || ''} ${item.active ? 'surface-100 text-900' : 'text-600 bg-transparent'}`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Área de conteúdo principal (lado direito) */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto max-h-screen">
        {/* Cabeçalho do painel */}
        <div className="mb-5">
          <span className="text-xs font-bold text-600 uppercase" style={{ letterSpacing: '0.1em' }}>
            Painel do Aluno
          </span>
          <h1 className="m-0 mt-2 text-3xl md:text-4xl font-bold">Sua jornada de estudos</h1>
          {/* Informações do aluno (matrícula, ID, bimestre) */}
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-500">
            <span>📅 Matrícula: <strong className="text-700">{alunoData?.dataMatricula || '--/--/----'}</strong></span>
            <span>🆔 ID: <strong className="text-700">{alunoData?.idAluno || '---'}</strong></span>
            <span>📘 Bimestre entrada: <strong className="text-700">{alunoData?.bimestreEntrada || '-'}º</strong></span>
          </div>
        </div>

        {/* Cartões de estatísticas (KPIs) */}
        <div className="grid mb-5">
          {[
            { label: 'MATÉRIAS MATRICULADAS', valor: materiasComProfessor.length || '0', color: 'var(--brand-blue)' },
            { label: 'AULAS CONCLUÍDAS', valor: '0', color: 'var(--brand-green)' },
            { label: 'PROVAS AGENDADAS', valor: '0', color: 'var(--brand-orange)' },
          ].map((stat, idx) => (
            <div key={idx} className="col-12 md:col-4">
              <div className="border-1 border-round-xl p-4 flex flex-column gap-2 h-full shadow-1" style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--border)' }}>
                <span className="text-xs font-bold text-500 uppercase">{stat.label}</span>
                <span className="text-4xl font-bold" style={{ color: stat.color }}>{stat.valor}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lista de matérias que o aluno está cursando (com professor escolhido) */}
        <h2 className="text-xl font-bold mb-3 mt-5">Suas matérias</h2>
        <div className="grid mb-5">
          {materiasComProfessor.length > 0 ? (
            materiasComProfessor.map((matricula) => {
              const disciplina = matricula.disciplina;
              const professorNome = matricula.professorEscolhido?.usuario?.nome || 'Professor(a)';
              const professorTipo = matricula.professorEscolhido?.tipo || '';
              return (
                <div key={matricula.id} className="col-12 md:col-6">
                  <div onClick={() => navigate(`/materia/${disciplina.id}`)} 
                       className="border-1 border-round-xl p-3 flex align-items-center gap-4 hover-lift transition-all cursor-pointer shadow-1" 
                       style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--border)' }}>
                    {/* Ícone da matéria (definido pelo ID) */}
                    <div className="flex align-items-center justify-content-center border-1 border-round-lg w-4rem h-4rem text-2xl" style={{ backgroundColor: 'var(--paper-2)', borderColor: 'var(--border)' }}>
                      {disciplina.id === 1 ? '📐' : disciplina.id === 2 ? '🧬' : disciplina.id === 3 ? '⚛️' : disciplina.id === 4 ? '🏛️' : disciplina.id === 5 ? '📖' : '📚'}
                    </div>
                    <div>
                      <h3 className="m-0 text-base font-bold text-900">{disciplina.nome}</h3>
                      <span className="text-sm text-600 mt-1 block">🧑‍🏫 {professorNome} {professorTipo && `— ${professorTipo}`}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center text-500 p-4">Escolha um professor em alguma matéria para vê-la aqui.</div>
          )}
        </div>

        {/* Seção de Matérias Favoritas */}
        <h2 className="text-xl font-bold mb-3 mt-5 flex align-items-center gap-2">⭐ Matérias Favoritas</h2>
        <div className="grid">
          {favoritos.length > 0 ? (
            favoritos.map((disciplina) => (
              <div key={disciplina.id} className="col-12 md:col-4">
                <div onClick={() => navigate(`/materia/${disciplina.id}`)} 
                     className="surface-0 border-1 border-round-xl p-4 flex flex-column gap-3 h-full hover-lift transition-all cursor-pointer card-favorita" 
                     style={{ borderColor: '#e2e8f0' }}>
                  <div className="text-3xl">
                    {disciplina.id === 1 ? '📐' : disciplina.id === 2 ? '🧬' : disciplina.id === 3 ? '⚛️' : disciplina.id === 4 ? '🏛️' : disciplina.id === 5 ? '📖' : '📚'}
                  </div>
                  <h3 className="m-0 text-lg font-bold text-900">{disciplina.nome}</h3>
                  <p className="m-0 text-sm text-600 line-height-3 flex-1">Clique para acessar o conteúdo.</p>
                  <span className="text-sm font-bold mt-2" style={{ color: 'var(--brand-blue)' }}>Ver conteúdo →</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-500 p-4">Você ainda não favoritou nenhuma matéria.</div>
          )}
        </div>
      </main>
    </div>
  );
}