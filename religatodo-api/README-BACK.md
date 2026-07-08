# Back-end – ReLigaTodo API

Este diretório contém a API REST do projeto ReLigaTodo, desenvolvida com Java e Spring Boot. A aplicação fornece os endpoints usados pelo front-end para autenticação, gestão de alunos, disciplinas, professores, matrículas, favoritos e videoaulas.

## Tecnologias principais

- Java
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- MySQL Connector
- Spring Security
- Lombok

## Estrutura da pasta

- src/main/java/com/religatodo/api/controller: controladores REST
  - AuthController: cadastro e login
  - AlunoController: dados do aluno
  - DisciplinaController: disciplinas disponíveis
  - ProfessorController: professores por disciplina
  - MatriculaController: matrícula, troca de professor e cancelamento
  - AlunoFavoritoController: gerenciamento de favoritos
  - VideoaulaController: consulta de vídeo-aulas
- src/main/java/com/religatodo/api/service: regras de negócio
- src/main/java/com/religatodo/api/entity: entidades JPA do domínio
- src/main/java/com/religatodo/api/repository: repositórios para acesso ao banco
- src/main/resources: configuração da aplicação e arquivos estáticos

O arquivo de configuração está em:
- src/main/resources/application.properties

## Endpoints principais

### Autenticação
- POST /api/auth/cadastro: cria um novo aluno
  - Exemplo de resposta:
    ```json
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com"
    }
    ```
- POST /api/auth/login: autentica o usuário
  - Exemplo de resposta:
    ```json
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com"
    }
    ```

### Alunos
- GET /api/alunos/meus-dados/{idUsuario}: retorna os dados do aluno
  - Exemplo de resposta:
    ```json
    {
      "idAluno": 1,
      "dataMatricula": "2024-01-15",
      "bimestreEntrada": 1
    }
    ```

### Disciplinas
- GET /api/disciplinas: lista todas as disciplinas
- GET /api/disciplinas/{id}: busca uma disciplina específica
  - Exemplo de resposta:
    ```json
    {
      "id": 1,
      "nome": "Matemática",
      "codigoMec": "MAT-001"
    }
    ```

### Professores
- GET /api/professores: lista todos os professores
- GET /api/professores/disciplina/{idDisciplina}: lista professores de uma disciplina

### Matrículas
- POST /api/matriculas: cria uma matrícula para o aluno
- GET /api/matriculas/aluno/{idUsuario}: lista matrículas do aluno
- GET /api/matriculas/aluno/{idUsuario}/disciplina/{idDisciplina}: verifica matrícula em uma disciplina
- PUT /api/matriculas/{idMatricula}/professor: define o professor da matrícula
- DELETE /api/matriculas/{idMatricula}: cancela a matrícula

### Favoritos
- GET /api/favoritos/aluno/{idUsuario}: lista disciplinas favoritas do aluno
- POST /api/favoritos: adiciona disciplina aos favoritos
- DELETE /api/favoritos: remove disciplina dos favoritos

### Videoaulas
- GET /api/videoaulas/disciplina/{idDisciplina}: lista aulas de uma disciplina
- GET /api/videoaulas/{id}: busca uma aula específica
  - Exemplo de resposta:
    ```json
    {
      "id": 1,
      "titulo": "Introdução à Matemática",
      "duracaoSegundos": 1800,
      "urlVideo": "https://www.youtube.com/watch?v=abc123"
    }
    ```

## Como executar

1. Entre na pasta do back-end:
   ```bash
   cd religatodo-api
   ```
2. Execute a aplicação com Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   No Windows, use:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
3. A API ficará disponível em:
   ```text
   http://localhost:8080
   ```

## Observações

- O projeto utiliza um esquema de banco já previsto pelo arquivo schema.sql e pelas entidades JPA.
- A segurança padrão foi desativada na configuração atual para facilitar o desenvolvimento local.
- O front-end consome esta API utilizando as rotas acima, principalmente em páginas de cadastro, login, painel e disciplina.
