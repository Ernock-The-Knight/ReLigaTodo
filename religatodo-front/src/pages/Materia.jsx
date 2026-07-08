// src/pages/Materia.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

export function Materia() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const userId = localStorage.getItem('userId');

  const [isFavorito, setIsFavorito] = useState(false);
  const [totalFavoritos, setTotalFavoritos] = useState(0);
  const [materia, setMateria] = useState(null);
  const [professores, setProfessores] = useState([]);
  const [matriculaAtual, setMatriculaAtual] = useState(null);
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alunoId, setAlunoId] = useState(null);

  // Cálculo da data de troca baseado na criação da matrícula
  const dataProximaTroca = matriculaAtual?.criadoEm 
    ? new Date(new Date(matriculaAtual.criadoEm).getTime() + 2 * 30 * 24 * 60 * 60 * 1000)
    : new Date();
  const dataTrocaFormatada = dataProximaTroca.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Configuração do limite de cancelamento (3 dias)
  const LIMITE_CANCELAMENTO_DIAS = 3;

  // Lógica para calcular o tempo restante para cancelar
  const calcularTempoRestante = () => {
    if (!matriculaAtual || !matriculaAtual.criadoEm) return { podeCancelar: false, tempoFormatado: '' };

    const dataCriacao = new Date(matriculaAtual.criadoEm);
    const dataAtual = new Date();
    
    const diferencaMs = dataAtual.getTime() - dataCriacao.getTime();
    const limiteMs = LIMITE_CANCELAMENTO_DIAS * 24 * 60 * 60 * 1000;
    const tempoRestanteMs = limiteMs - diferencaMs;

    if (tempoRestanteMs <= 0) {
      return { podeCancelar: false, tempoFormatado: '' };
    }

    const dias = Math.floor(tempoRestanteMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tempoRestanteMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tempoRestanteMs % (1000 * 60 * 60)) / (1000 * 60));

    let tempoFormatado = '';
    if (dias > 0) tempoFormatado += `${dias} dia${dias > 1 ? 's' : ''}, `;
    if (horas > 0) tempoFormatado += `${horas}h e `;
    tempoFormatado += `${minutos}min`;

    return { podeCancelar: true, tempoFormatado };
  };

  useEffect(() => {
    const fetchDados = async () => {
      if (!id) return;
      try {
        const resAluno = await axios.get(`http://localhost:8080/api/alunos/meus-dados/${userId}`);
        setAlunoId(resAluno.data.idAluno);

        const resMateria = await axios.get(`http://localhost:8080/api/disciplinas/${id}`);
        setMateria(resMateria.data);

        const resProf = await axios.get(`http://localhost:8080/api/professores/disciplina/${id}`);
        setProfessores(resProf.data);

        const resAulas = await axios.get(`http://localhost:8080/api/videoaulas/disciplina/${id}`);
        setAulas(resAulas.data);

        const resFavs = await axios.get(`http://localhost:8080/api/favoritos/aluno/${userId}`);
        setTotalFavoritos(resFavs.data.length);

        const idsFav = resFavs.data.map(d => d.id);
        if (idsFav.includes(Number(id))) {
          setIsFavorito(true);
        } else {
          setIsFavorito(false);
        }

        if (userId && userId !== '0') {
          try {
            const resMatricula = await axios.get(`http://localhost:8080/api/matriculas/aluno/${userId}/disciplina/${id}`);
            setMatriculaAtual(resMatricula.data);
          } catch (err) {
            setMatriculaAtual(null);
          }
        } else {
          setMatriculaAtual(null);
        }
      } catch (error) {
        console.error("Erro ao carregar dados da matéria:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchDados();
  }, [id, userId]);

  const handleToggleFavorito = async () => {
    if (!alunoId) {
      alert("Aguarde o carregamento da página antes de favoritar.");
      return;
    }
    try {
      if (isFavorito) {
        try {
          await axios.delete(`http://localhost:8080/api/favoritos`, {
            params: { idAluno: alunoId, idDisciplina: Number(id) }
          });
          setIsFavorito(false);
          setTotalFavoritos(prev => Math.max(0, prev - 1));
        } catch (deleteError) {
          if (deleteError.response && deleteError.response.status === 400) {
            console.warn("Tentou remover um item já removido. Sincronizando estado...");
            setIsFavorito(false);
            setTotalFavoritos(prev => Math.max(0, prev - 1));
            return;
          }
          throw deleteError;
        }
      } else {
        await axios.post(`http://localhost:8080/api/favoritos`, null, {
          params: { idAluno: alunoId, idDisciplina: Number(id) }
        });
        setIsFavorito(true);
        setTotalFavoritos(prev => prev + 1);
      }
    } catch (error) {
      console.error("Erro completo ao alterar favorito:", error);
      let mensagemErro = "Erro desconhecido no servidor.";
      if (error.response && error.response.data) {
        mensagemErro = typeof error.response.data === 'string'
          ? error.response.data
          : JSON.stringify(error.response.data);
      }
      alert("Erro ao atualizar favorito: " + mensagemErro);
    }
  };

  const handleEscolherProfessor = async (professorId) => {
    try {
      let matriculaId;
      if (!matriculaAtual) {
        const resAluno = await axios.get(`http://localhost:8080/api/alunos/meus-dados/${userId}`);
        const idAlunoReal = resAluno.data.idAluno;
        const response = await axios.post('http://localhost:8080/api/matriculas', {
          idAluno: idAlunoReal,
          idDisciplina: Number(id),
          bimestre: 1
        });
        matriculaId = response.data;
      } else {
        matriculaId = matriculaAtual.id;
      }

      await axios.put(`http://localhost:8080/api/matriculas/${matriculaId}/professor`, {
        idProfessor: professorId
      });

      alert("Professor escolhido com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao matricular/escolher professor:", error);
      alert("Erro ao processar matrícula: " + (error.response?.data || error.message));
    }
  };

  const handleCancelarMatricula = async () => {
    if (!matriculaAtual) {
      alert("Nenhuma matrícula ativa para cancelar.");
      return;
    }
    if (window.confirm("Tem certeza que deseja cancelar sua matrícula nesta matéria?")) {
      try {
        await axios.delete(`http://localhost:8080/api/matriculas/${matriculaAtual.id}`);
        alert("Matrícula cancelada com sucesso!");
        window.location.reload();
      } catch (error) {
        console.error("Erro ao cancelar matrícula:", error);
        alert("Erro ao cancelar matrícula.");
      }
    }
  };

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
    active: location.pathname === item.rota
  }));

  if (loading) return <div className="p-5">Carregando matéria...</div>;

  const jaEscolheuProfessor = matriculaAtual?.professorEscolhido?.idProfessor;
  const limiteAtingido = totalFavoritos >= 3 && !isFavorito;
  const { podeCancelar, tempoFormatado } = calcularTempoRestante();

  return (
    <div className="flex font-sans text-900 surface-ground min-h-screen">
      <aside className="hidden md:flex flex-column w-15rem surface-0 border-right-1 sticky p-4" 
             style={{ height: 'calc(100vh - 72px)', top: '72px', borderColor: '#e2e8f0' }}>
        <ul className="list-none p-0 m-0 flex flex-column gap-2">
          {menuItens.map((item, idx) => (
            <li key={idx}>
              <a href="#" onClick={(e) => { e.preventDefault(); if (item.rota) navigate(item.rota); }}
                className={`flex align-items-center gap-3 px-3 py-2 border-round-lg cursor-pointer text-sm font-medium no-underline sidebar-item ${item.classeHover || ''} ${item.active ? 'surface-100 text-900' : 'text-600 bg-transparent'}`}>
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-5 md:p-7">
        <div className="mb-5">
          <span className="text-xs font-bold text-500 cursor-pointer hover:text-800" onClick={() => navigate('/painel')}>← Painel</span>
          <div className="flex align-items-center gap-3 mt-2 flex-wrap">
            <h1 className="m-0 text-4xl font-extrabold text-800 flex align-items-center gap-3">
              <span className="surface-200 p-2 border-round-lg text-2xl">📐</span>
              {materia?.nome || 'Carregando...'}
            </h1>
            <button
              onClick={handleToggleFavorito}
              disabled={limiteAtingido}
              style={{
                border: limiteAtingido ? '1px solid #e2e8f0' : (isFavorito ? '1px solid #eab308' : '1px solid #d1d5db'),
                color: limiteAtingido ? '#9ca3af' : (isFavorito ? '#ca8a04' : '#4b5563'),
                backgroundColor: limiteAtingido ? '#f3f4f6' : 'transparent',
                cursor: limiteAtingido ? 'not-allowed' : 'pointer'
              }}
              className={`flex align-items-center gap-2 px-3 py-2 border-round-3xl bg-transparent font-bold text-sm transition-all`}
            >
              <span className="text-xl">{limiteAtingido ? '🚫' : (isFavorito ? '⭐' : '☆')}</span>
              <span>
                {limiteAtingido
                  ? 'Limite máximo (3/3)'
                  : (isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos')}
              </span>
            </button>
          </div>
          <p className="text-600 mt-2 text-sm">Código MEC: {materia?.codigoMec || '---'}</p>
        </div>

        {jaEscolheuProfessor ? (
          <>
            <div className="flex justify-content-between align-items-center mb-3">
              <h2 className="text-xl font-bold m-0 text-800">Professor escolhido</h2>
              
              {/* 🆕 CORREÇÃO: O cadeado SÓ aparece depois que o prazo de cancelar já expirou (!podeCancelar) */}
              {!podeCancelar && (
                <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 border-round-2xl">
                  🔒 Troca liberada em {dataTrocaFormatada}
                </span>
              )}
            </div>

            <div className="border-1 p-3 border-round-3xl mb-4 text-sm text-800 line-height-3" style={{ borderColor: '#e2e8f0' }}>
              {`Você escolheu ${matriculaAtual.professorEscolhido.usuario?.nome || 'um professor'} para esta matéria.`}
            </div>

            {/* Botão de cancelar com contador */}
            {podeCancelar ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <button
                  onClick={handleCancelarMatricula}
                  style={{
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    border: '1px solid #fca5a5',
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#fecaca'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#fee2e2'}
                >
                  🗑️ Cancelar matrícula (Remover)
                </button>
                <span style={{ fontSize: '13px', color: '#6b7280', marginTop: '-4px' }}>
                  ⏳ Você tem <strong>{LIMITE_CANCELAMENTO_DIAS} dias</strong> para cancelar. 
                  Tempo restante: <strong>{tempoFormatado}</strong>
                </span>
              </div>
            ) : (
              <div style={{ 
                backgroundColor: '#f3f4f6', 
                padding: '12px 16px', 
                borderRadius: '8px', 
                marginBottom: '16px',
                fontSize: '14px',
                color: '#6b7280',
                textAlign: 'center'
              }}>
                ⚠️ O prazo de {LIMITE_CANCELAMENTO_DIAS} dias para cancelar esta matrícula já expirou.
              </div>
            )}

            <div className="grid mb-6">
              {professores.slice(0, 3).map((prof) => {
                const isSelected = matriculaAtual?.professorEscolhido?.idProfessor === prof.idProfessor;
                return (
                  <div key={prof.idProfessor} className="col-12 md:col-4">
                    <div className={`surface-0 shadow-1 border-1 border-round-2xl p-4 ${isSelected ? 'border-2 border-blue-500' : 'opacity-70'}`}>
                      <div className="flex align-items-center gap-3 mb-3">
                        <div className="w-3rem h-3rem border-circle surface-200 flex align-items-center justify-content-center text-xl">👩🏼‍🏫</div>
                        <div>
                          <h3 className="m-0 text-base font-bold">{prof.usuario?.nome || 'Professor(a)'}</h3>
                          <span className="text-sm text-blue-500">{prof.tipo || 'Expositor'}</span>
                        </div>
                      </div>
                      <p className="text-sm text-600 line-height-3 mt-0">{prof.especialidadeTag || 'Professor especialista na área.'}</p>
                      <button disabled={true} style={{ backgroundColor: isSelected ? '#f3f4f6' : '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' }} className={`w-full mt-3 py-2 border-round-3xl text-sm font-bold cursor-not-allowed`}>
                        {isSelected ? '✅ Selecionado' : '🔒 Bloqueado'}
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="col-12 md:col-4">
                <div className="surface-0 border-1 border-round-2xl p-4 flex flex-column justify-content-center align-items-center h-full cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: '#e2e8f0', borderStyle: 'dashed' }}>
                  <span className="text-600 font-bold">+ Ver mais professores</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid mb-6">
            {professores.slice(0, 3).map((prof) => (
              <div key={prof.idProfessor} className="col-12 md:col-4">
                <div className="surface-0 shadow-1 border-1 border-round-2xl p-4">
                  <div className="flex align-items-center gap-3 mb-3">
                    <div className="w-3rem h-3rem border-circle surface-200 flex align-items-center justify-content-center text-xl">👩🏼‍🏫</div>
                    <div>
                      <h3 className="m-0 text-base font-bold">{prof.usuario?.nome || 'Professor(a)'}</h3>
                      <span className="text-sm text-blue-500">{prof.tipo || 'Expositor'}</span>
                    </div>
                  </div>
                  <p className="text-sm text-600 line-height-3 mt-0">{prof.especialidadeTag || 'Professor especialista na área.'}</p>
                  <button onClick={() => handleEscolherProfessor(prof.idProfessor)} style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none' }} className={`w-full mt-3 py-2 border-round-3xl text-sm font-bold cursor-pointer hover:opacity-90 transition-all`}>
                    Escolher professor
                  </button>
                </div>
              </div>
            ))}
            <div className="col-12 md:col-4">
              <div className="surface-0 border-1 border-round-2xl p-4 flex flex-column justify-content-center align-items-center h-full cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: '#e2e8f0', borderStyle: 'dashed' }}>
                <span className="text-600 font-bold">+ Ver mais professores</span>
              </div>
            </div>
          </div>
        )}

        {jaEscolheuProfessor && (
          <div className="surface-0 shadow-1 border-round-2xl p-5 mt-4">
            <div className="flex justify-content-between align-items-end mb-3">
              <div>
                <span className="text-xs font-bold text-500 uppercase tracking-widest">SEU PROGRESSO</span>
                <h2 className="m-0 mt-1 text-2xl font-bold text-800">{aulas.length} de {aulas.length} aulas concluídas</h2>
              </div>
              <span className="text-sm text-600">Faltam 75% para liberar a prova</span>
            </div>
            <div className="w-full surface-200 border-round-xl h-1rem mb-5 overflow-hidden">
              <div className="bg-blue-500 h-full border-round-xl" style={{ width: '5%' }}></div>
            </div>
            <div className="flex flex-column gap-3">
              {aulas.length > 0 ? (
                aulas.map((aula) => (
                  <div key={aula.id} onClick={() => navigate('/aula/' + aula.id, { state: { materiaId: id } })} className="card-aula flex align-items-center justify-content-between p-3 border-1 border-round-xl cursor-pointer">
                    <div className="flex align-items-center gap-4">
                      <div className="w-3rem h-3rem surface-200 border-round-lg flex align-items-center justify-content-center font-bold text-600">{aula.id}</div>
                      <div>
                        <h4 className="m-0 mb-1 text-base text-800">{aula.titulo}</h4>
                        <span className="text-sm text-500">{Math.floor(aula.duracaoSegundos / 60)} min</span>
                      </div>
                    </div>
                    <button className="text-assistir px-4 py-2 bg-transparent border-none font-bold cursor-pointer">Assistir →</button>
                  </div>
                ))
              ) : (
                <div className="text-center text-600 p-3">Nenhuma aula disponível para esta matéria ainda.</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}