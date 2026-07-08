# Front-end – ReLigaTodo

Este diretório contém a aplicação web da plataforma ReLigaTodo, construída com React e Vite. A interface consome a API REST do back-end para realizar cadastro, autenticação, gestão de matrículas, favoritos e navegação por matérias e aulas.

## Tecnologias principais

- React 19
- Vite
- React Router DOM
- Axios
- PrimeReact / PrimeFlex / PrimeIcons
- ESLint

## Estrutura da pasta

- src/pages: telas principais da aplicação
  - Home: landing page inicial
  - Cadastro: formulário de cadastro de aluno
  - Login: autenticação do usuário
  - PainelAluno: painel com dados do aluno, matrículas e favoritos
  - Materia: detalhes da disciplina, professores e videoaulas
  - Aula: página de reprodução/visualização da aula
- src/components: componentes reutilizáveis como header e seções da landing page
- src/routes: configuração das rotas da aplicação
- src/styles: tokens e estilos globais
- public: arquivos estáticos

## Rotas principais

- /: página inicial
- /cadastro: cadastro de conta
- /login: autenticação
- /painel: painel do aluno
- /materia/:id: detalhes da disciplina
- /aula/:id: conteúdo da aula

## Páginas e endpoints consumidos

- Home: não consome endpoints, apenas navega entre telas
- Cadastro: consome POST /api/auth/cadastro
- Login: consome POST /api/auth/login
- PainelAluno: consome GET /api/alunos/meus-dados/{userId}, GET /api/matriculas/aluno/{userId} e GET /api/favoritos/aluno/{userId}
- Materia: consome GET /api/disciplinas/{id}, GET /api/professores/disciplina/{id}, GET /api/videoaulas/disciplina/{id}, GET /api/matriculas/aluno/{userId}/disciplina/{id}, PUT /api/matriculas/{matriculaId}/professor, POST /api/matriculas, DELETE /api/matriculas/{matriculaId}, GET /api/favoritos/aluno/{userId}, POST /api/favoritos e DELETE /api/favoritos
- Aula: consome GET /api/videoaulas/{id}

## Funcionalidades implementadas

- Navegação entre páginas da plataforma
- Cadastro de aluno via API
- Login do usuário e persistência do id no localStorage
- Painel com dados pessoais e listas de matérias
- Página de disciplina com escolha de professor e gestão de matrícula
- Favoritar disciplinas
- Visualização de aulas com player YouTube e progresso simulado

## Como executar

1. Entre na pasta do front-end:
   ```bash
   cd religatodo-front
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
4. A aplicação ficará disponível em:
   ```text
   http://localhost:5173
   ```

## Integração com a API

A interface espera que a API esteja rodando em:
```text
http://localhost:8080
```

## Scripts disponíveis

- npm run dev: inicia o servidor de desenvolvimento
- npm run build: gera a build de produção
- npm run preview: visualiza a build localmente
- npm run lint: valida o código com ESLint

## Observações

O projeto possui duas formas de roteamento no repositório, mas a configuração ativa utilizada pela aplicação é a definida em src/routes/Router.jsx.