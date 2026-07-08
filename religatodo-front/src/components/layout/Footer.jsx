import React from "react";

export function Footer() {
  return (
    <footer className="px-5 py-3 sticky top-0 z-5 border-round-1xl font-medium shadow-2 border-top-0 surface-border">
      {/* Contêiner principal com largura máxima controlada */}
      <div className="mx-auto px-4 py-7 md:px-8" style={{ backgroundColor: 'var(--paper-2)' }}>
        
        {/* Grid do PrimeFlex dividindo em 3 colunas */}
        <div className="grid gap-4 md:gap-0">
          
          {/* Coluna 1: Logo e Descrição (Ocupa 5/12 no desktop) */}
          <div className="col-12 md:col-5">
            <a href="/" aria-label="ReLigaTodo — home" className="inline-block">
              {/* Utiliza o mesmo caminho de imagem que funcionou no Header */}
              <img src="/src/assets/religatodo2.png" alt="ReLigaTodo" height="60" />
            </a>
            <p className="mt-4 text-sm text-600 line-height-3 pr-4">
              Conectando alunos, professores e polos físicos para democratizar a educação
              de qualidade no Brasil.
            </p>
          </div>

          {/* Coluna 2: Links da Plataforma (Ocupa 3/12 no desktop) */}
          <div className="col-12 md:col-3">
            <div className="text-xs font-bold uppercase text-500 mb-4" style={{ letterSpacing: '0.15em' }}>
              Plataforma
            </div>
            <ul className="list-none p-0 m-0 flex flex-column gap-3 text-sm">
              {[
                ["#missao", "Nossa Missão"],
              ].map(([h, l]) => (
                <li key={h}>
                  <a href={h} className="text-700 hover:text-blue-500 no-underline transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato (Ocupa 4/12 no desktop) */}
          <div className="col-12 md:col-4">
            <div className="text-xs font-bold uppercase text-500 mb-4" style={{ letterSpacing: '0.15em' }}>
              Contato
            </div>
            <ul className="list-none p-0 m-0 flex flex-column gap-3 text-sm text-700">
              <li>contato@religatodo.com.br</li>
              <li>Rio de Janeiro · Brasil</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Barra Inferior (Copyright) */}
      <div className="border-top-1 surface-border">
        <div 
          className="mx-auto flex flex-wrap align-items-center justify-content-between gap-3 px-4 py-4 text-xs text-500 md:px-8" 
          style={{ maxWidth: '1200px' }}
        >
          <span>© {new Date().getFullYear()} ReLigaTodo. Todos os direitos reservados.</span>
          <span>Conectando a educação no Brasil.</span>
        </div>
      </div>
    </footer>
  );
}