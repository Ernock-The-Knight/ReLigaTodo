// src/pages/Aula.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

export function Aula() {
  // Hooks de navegação e parâmetros
  const navigate = useNavigate();
  const { id } = useParams(); // ID da aula na URL (ex: /aula/1 -> id = 1)
  const location = useLocation();
  // Pega o ID da matéria que foi passado pelo estado (para o botão "Voltar")
  const materiaId = location.state?.materiaId || '1';

  // Estados para os dados da aula e controle do progresso
  const [aulaData, setAulaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progresso, setProgresso] = useState(5); // Progresso simulado (inicia em 5%)
  const [aulaConcluida, setAulaConcluida] = useState(false);

  // useEffect: busca os dados da aula específica no Back-end
  useEffect(() => {
    const fetchAula = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`http://localhost:8080/api/videoaulas/${id}`);
        setAulaData(res.data);
      } catch (error) {
        console.error("Erro ao buscar aula:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAula();
  }, [id]);

  // Função para simular o avanço do progresso (clique no player)
  const simularProgresso = () => {
    if (progresso < 100) {
      const novoProgresso = progresso + 25;
      setProgresso(novoProgresso > 100 ? 100 : novoProgresso);
      if (novoProgresso >= 100) setAulaConcluida(true);
    }
  };

  // Exibe mensagem de carregamento enquanto os dados não chegam
  if (loading) {
    return <div className="p-5">Carregando aula...</div>;
  }

  // Converte a URL do YouTube (watch?v=...) para o formato embed
  const getEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    // Container principal, centralizado e com largura máxima
    <div className="surface-ground min-h-screen p-4 md:p-6 flex justify-content-center w-full">
      <div className="w-full flex flex-column align-items-center" style={{ maxWidth: '850px' }}>
        
        {/* Cabeçalho da aula */}
        <div className="mb-4 w-full">
          <span className="text-sm text-600 cursor-pointer hover:text-800 transition-colors" onClick={() => navigate('/materia/' + materiaId)}>
            Painel / {materiaId === '1' ? 'Matemática' : 'Matéria'}
          </span>
          <h1 className="m-0 mt-2 text-4xl font-bold text-900">{aulaData?.titulo || 'Carregando...'}</h1>
          <span className="text-sm text-600 flex align-items-center gap-2 mt-2">
            👩🏾‍🏫 Prof. {aulaData?.professor?.usuario?.nome || 'Professor(a)'}
            <span className="text-300">•</span> Aula {aulaData?.id}
            <span className="text-300">•</span> {Math.floor((aulaData?.duracaoSegundos || 0) / 60)} min
          </span>
        </div>

        {/* Player de vídeo real do YouTube (com permissões sandbox para evitar erros) */}
        {aulaData?.urlVideo ? (
          <div className="w-full shadow-3 mb-4 overflow-hidden bg-black border-round-3xl" style={{ aspectRatio: '16 / 9' }}>
            <iframe
              width="100%"
              height="100%"
              src={getEmbedUrl(aulaData.urlVideo)}
              title={aulaData.titulo}
              frameBorder="0"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-forms"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          // Se não houver URL, exibe o simulador (para demonstração da regra de negócio)
          <div className="w-full bg-gray-900 shadow-3 mb-4 flex flex-column align-items-center justify-content-center text-white cursor-pointer transition-all hover:surface-800 border-round-3xl"
               style={{ aspectRatio: '16 / 9' }}
               onClick={simularProgresso}>
            <i className="pi pi-youtube text-6xl mb-3 text-red-500"></i>
            <h2 className="m-0 text-xl font-bold">Simulador de Vídeo</h2>
            <p className="text-gray-400 m-0 mt-1">Clique aqui para simular o progresso da aula</p>
          </div>
        )}

        {/* Card de controle de progresso */}
        <div className="surface-0 shadow-1 border-1 border-round-2xl p-4 md:p-5 mb-4 w-full transition-all" style={{ borderColor: 'var(--border)' }}>
          <div className="flex justify-content-between align-items-center mb-3">
            <div>
              {/* Texto muda conforme a aula foi concluída ou não */}
              <span className={`text-xs font-bold uppercase tracking-widest ${aulaConcluida ? 'text-green-500' : 'text-600'}`}>
                {aulaConcluida ? 'AULA CONCLUÍDA' : 'PLAYER TRAVADO'}
              </span>
              <p className="m-0 mt-1 text-sm text-800">
                {aulaConcluida ? 'Você terminou esta aula. Pode avançar!' : 'Você precisa assistir a aula inteira para concluir.'}
              </p>
            </div>
            {/* Temporizador simulado (baseado no progresso) */}
            <span className="text-xs font-bold text-500 font-mono">
              {Math.floor((18 * progresso) / 100).toString().padStart(2, '0')}:00 / 18:00
            </span>
          </div>

          {/* Barra de progresso visual */}
          <div className="flex align-items-center gap-2 mb-4">
            <div className="w-full surface-200 h-1rem border-round-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full border-round-xl transition-all transition-duration-500" 
                   style={{ backgroundColor: aulaConcluida ? 'var(--brand-green)' : 'var(--brand-blue)', width: `${progresso}%` }}></div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-3">
            <button className="px-4 py-2 border-none border-round-3xl text-white font-bold transition-colors btn-interativo" 
                    style={{ backgroundColor: aulaConcluida ? 'var(--brand-green)' : 'var(--brand-blue)', opacity: aulaConcluida ? 1 : 0.7, cursor: aulaConcluida ? 'pointer' : 'not-allowed' }} 
                    disabled={!aulaConcluida} 
                    onClick={() => alert('Rota para a próxima aula acionada!')}>
              {aulaConcluida ? 'Próxima Aula →' : 'Continue assistindo...'}
            </button>
            <button onClick={() => navigate('/materia/' + materiaId)} 
                    className="px-4 py-2 border-1 border-round-3xl bg-transparent text-900 font-bold cursor-pointer transition-colors hover:surface-100 btn-interativo" 
                    style={{ borderColor: 'var(--border)' }}>
              Voltar à matéria
            </button>
          </div>
        </div>

        {/* Card com informações adicionais */}
        <div className="surface-0 shadow-1 border-1 border-round-2xl p-4 md:p-5 w-full" style={{ borderColor: 'var(--border)' }}>
          <h3 className="m-0 mb-2 text-base font-bold text-900">Sobre esta aula</h3>
          <p className="m-0 text-sm text-600 line-height-3">{aulaData?.titulo || 'Conteúdo da aula em construção...'}</p>
        </div>
      </div>
    </div>
  );
}