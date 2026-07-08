// Importa os componentes do React Router DOM.
import { Routes, Route } from 'react-router-dom';

// Importa as páginas da aplicação.
// Home usa export padrão; os demais usam export nomeado.
import Home from '../pages/Home';
import { Cadastro } from '../pages/Cadastro';
import { PainelAluno } from '../pages/PainelAluno';
import { Aula } from '../pages/Aula';
import { Materia } from '../pages/Materia';

/**
 * ⚠️ ATENÇÃO: Este arquivo NÃO está sendo utilizado atualmente.
 * O arquivo 'src/main.jsx' está importando o 'AppRouter' do arquivo 'Router.jsx'.
 * Se você quiser usar este arquivo, lembre-se de alterar a importação no 'main.jsx' e remover o 'Router.jsx'.
 * Caso contrário, este arquivo pode ser apagado sem prejudicar o funcionamento do sistema.
 */
export default function AppRoutes() {
  return (
    // <Routes> define as rotas da aplicação sem um componente pai <BrowserRouter>.
    // O <BrowserRouter> precisa estar presente em algum lugar acima (geralmente no 'main.jsx').
    <Routes>
      {/* Rota raiz ("/") – renderiza a página Home. */}
      <Route path="/" element={<Home />} />

      {/* Rota de cadastro ("/cadastro") – renderiza o formulário de cadastro. */}
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Rota do painel do aluno ("/painel") – renderiza a tela principal do aluno. */}
      <Route path="/painel" element={<PainelAluno />} />

      {/* Rota dinâmica para aulas ("/aula/:id") – :id é o identificador da aula. */}
      <Route path="/aula/:id" element={<Aula />} />

      {/* Rota dinâmica para matérias ("/materia/:id") – :id é o identificador da disciplina. */}
      <Route path="/materia/:id" element={<Materia />} />
    </Routes>
  );
}