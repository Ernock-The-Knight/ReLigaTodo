// Importa os componentes essenciais do React Router DOM.
// BrowserRouter: envolve a aplicação e gerencia a navegação.
// Routes: contém as definições de rotas.
// Route: define uma rota individual.
// Outlet: local onde as rotas filhas serão renderizadas dentro de um layout.
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Importa as páginas da aplicação.
// App é o componente da página inicial (Home).
import App from '../App'; 
import { Cadastro } from '../pages/Cadastro';
import { PainelAluno } from '../pages/PainelAluno';
import { Materia } from '../pages/Materia';
import { Aula } from '../pages/Aula';
import { Login } from '../pages/Login'; // <-- Página de Login

// Importa o Header que será exibido em todas as páginas (públicas e internas).
import Header from '../components/Header'; 

/**
 * LAYOUT PÚBLICO (sem barra lateral)
 * Utilizado para páginas como Home, Cadastro e Login.
 * Exibe apenas o Header e o conteúdo da página.
 */
function PublicLayout() {
  return (
    <div className="flex flex-column w-full">
      <Header /> {/* Header global */}
      <div className="w-full">
        <Outlet /> {/* Aqui as rotas filhas serão renderizadas */}
      </div>
    </div>
  );
}

/**
 * LAYOUT DO PAINEL (com barra lateral)
 * Utilizado para páginas internas do aluno (Painel, Matéria, Aula).
 * Exibe o Header e permite a renderização de uma barra lateral (ainda não implementada).
 */
function LayoutPainel() {
  return (
    <div className="flex flex-column w-full min-h-screen">
      <Header /> {/* Header global */}
      <div className="flex w-full flex-1">
        <Outlet /> {/* Aqui as rotas filhas serão renderizadas */}
      </div>
    </div>
  );
}

/**
 * COMPONENTE PRINCIPAL DE ROTEAMENTO
 * Este é o componente que deve ser importado no 'main.jsx'.
 */
export function AppRouter() {
  return (
    // BrowserRouter envolve toda a aplicação para gerenciar a navegação.
    <BrowserRouter>
      <Routes>
        {/* ROTAS PÚBLICAS – usam o PublicLayout (sem barra lateral) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<App />} />                   {/* Página inicial */}
          <Route path="/cadastro" element={<Cadastro />} />       {/* Cadastro */}
          <Route path="/login" element={<Login />} />             {/* Login */}
        </Route>

        {/* ROTAS INTERNAS – usam o LayoutPainel (com barra lateral, se implementada) */}
        <Route element={<LayoutPainel />}>
          <Route path="/painel" element={<PainelAluno />} />      {/* Painel do aluno */}
          <Route path="/materia/:id" element={<Materia />} />     {/* Página da matéria (id dinâmico) */}
          <Route path="/aula/:id" element={<Aula />} />           {/* Página da aula (id dinâmico) */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}