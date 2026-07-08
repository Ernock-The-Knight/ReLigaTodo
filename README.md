 # ReLigaTodo

## Seção 1 - Sobre o projeto

**Nome do projeto:** 

[ReLigaTodo]

**ODS escolhida:**

ODS 4 – Educação de Qualidade e 
ODS 10 – Redução das Desigualdades

**Autor:**

[Robson-M.-Vieira]

**Objetivo do projeto:**

O ReLigaTodo é uma plataforma educacional voltada para democratizar o acesso
à educação, conectando alunos, professores e conteúdos em um ambiente digital. 
A proposta é facilitar o cadastro de alunos, a escolha de disciplinas, o 
acompanhamento de aulas e a gestão de matrículas, promovendo mais 
inclusão e acesso à aprendizagem de qualidade.

## Seção 2 - Como rodar

### Como rodar o front-end
1. Entre na pasta do front-end:
   ```bash
   cd religatodo-front
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o projeto:
   ```bash
   npm run dev
   ```
4. Acesse a aplicação em:
   ```text
   http://localhost:5173
   ```

### Como rodar o back-end
1. Entre na pasta do back-end:
   ```bash
   cd religatodo-api
   ```
2. Execute a aplicação com Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   No Windows:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
3. A API ficará disponível em:
   ```text
   http://localhost:8080
   ```

### Arquivo do script SQL
O script responsável pela criação do banco de dados e das tabelas está no arquivo [schema.sql](schema.sql).

## Estrutura do repositório

- [religatodo-front](religatodo-front): aplicação React/Vite do front-end
- [religatodo-api](religatodo-api): API Spring Boot do back-end
- [schema.sql](schema.sql): script SQL para criação do banco de dados
