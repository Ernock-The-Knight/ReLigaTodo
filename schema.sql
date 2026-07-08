
---

### 📄 2. `schema.sql` (Script SQL)

```sql
-- ============================================================
-- Criação do banco de dados
-- ============================================================
DROP DATABASE IF EXISTS religatodo;
CREATE DATABASE religatodo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE religatodo;

-- =====================================================================
-- GRUPO A - ENTIDADES BASE
-- =====================================================================

-- CATÁLOGO DE PAPÉIS (RBAC)
CREATE TABLE papeis (
  id_papel   INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  nome       VARCHAR(50)   NOT NULL UNIQUE,
  descricao  VARCHAR(200)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- POLOS (Unidades presenciais)
CREATE TABLE polos (
  id_polo        INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  nome           VARCHAR(200)  NOT NULL,
  municipio      VARCHAR(100)  NOT NULL,
  estado         CHAR(2)       NOT NULL,
  qtd_terminais  INT           NOT NULL DEFAULT 1,
  ativo          TINYINT(1)    NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- DISCIPLINAS
CREATE TABLE disciplinas (
  id_disciplina        INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  nome                 VARCHAR(200)  NOT NULL,
  codigo_mec           VARCHAR(30),
  carga_horaria_total  INT           NOT NULL,
  ativa                TINYINT(1)    DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TÓPICOS DA EMENTA
CREATE TABLE topicos_ementa (
  id_topico          INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_disciplina      INT UNSIGNED  NOT NULL,
  titulo             VARCHAR(300)  NOT NULL,
  ordem              INT           NOT NULL,
  carga_horaria_min  INT           NOT NULL,
  obrigatorio_mec    TINYINT(1)    NOT NULL DEFAULT 1,
  CONSTRAINT fk_topico_disc
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================================
-- GRUPO B - AUTH E PERFIS
-- =====================================================================

-- USUÁRIOS (Entidade pura de autenticação)
CREATE TABLE usuarios (
  id_usuario  INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(150)  NOT NULL,
  email       VARCHAR(200)  NOT NULL UNIQUE,
  senha_hash  VARCHAR(255)  NOT NULL,
  cpf         CHAR(11)      NOT NULL UNIQUE,
  gov_br_id   VARCHAR(100),
  ativo       TINYINT(1)    NOT NULL DEFAULT 1,
  criado_em   DATETIME      DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ATRIBUIÇÃO DE PAPÉIS (N:M)
CREATE TABLE usuario_papeis (
  id_usuario  INT UNSIGNED  NOT NULL,
  id_papel    INT UNSIGNED  NOT NULL,
  id_contexto INT UNSIGNED,
  vigente_desde DATETIME    DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_usuario, id_papel, id_contexto),
  CONSTRAINT fk_up_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  CONSTRAINT fk_up_papel
    FOREIGN KEY (id_papel) REFERENCES papeis(id_papel)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- PERFIS ESTENDIDOS
CREATE TABLE alunos (
  id_aluno            INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_usuario          INT UNSIGNED  NOT NULL UNIQUE,
  id_polo             INT UNSIGNED,
  data_matricula      DATE          NOT NULL,
  bimestre_entrada    TINYINT       NOT NULL DEFAULT 1,
  tag_acessibilidade  ENUM('nenhuma','tea','tdah','ambos') DEFAULT 'nenhuma',
  CONSTRAINT fk_aluno_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE admins (
  id_admin    INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_usuario  INT UNSIGNED  NOT NULL UNIQUE,
  id_polo     INT UNSIGNED,
  escopo      ENUM('secretaria','municipio') NOT NULL,
  CONSTRAINT fk_admin_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE professores (
  id_professor        INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_usuario          INT UNSIGNED  NOT NULL UNIQUE,
  id_admin_cadastrou  INT UNSIGNED,
  tipo                ENUM('expositor','atendente','especialista') NOT NULL,
  especialidade_tag   VARCHAR(100),
  status_disponivel   TINYINT(1)    DEFAULT 0,
  CONSTRAINT fk_prof_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  CONSTRAINT fk_prof_admin
    FOREIGN KEY (id_admin_cadastrou) REFERENCES admins(id_admin)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE fiscais (
  id_fiscal         INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_usuario        INT UNSIGNED  NOT NULL UNIQUE,
  id_polo           INT UNSIGNED  NOT NULL,
  token_supervisor  VARCHAR(64)   NOT NULL,
  CONSTRAINT fk_fiscal_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  CONSTRAINT fk_fiscal_polo
    FOREIGN KEY (id_polo) REFERENCES polos(id_polo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================================
-- GRUPO C - CONTEÚDO (AULAS E FAQ)
-- =====================================================================

CREATE TABLE videoaulas (
  id_video          INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_topico         INT UNSIGNED  NOT NULL,
  id_professor      INT UNSIGNED  NOT NULL,
  titulo            VARCHAR(300)  NOT NULL,
  url_video         TEXT          NOT NULL,
  duracao_segundos  INT           NOT NULL,
  bimestre          TINYINT       NOT NULL,
  publicado         TINYINT(1)    DEFAULT 0,
  CONSTRAINT fk_video_topico
    FOREIGN KEY (id_topico) REFERENCES topicos_ementa(id_topico),
  CONSTRAINT fk_video_prof
    FOREIGN KEY (id_professor) REFERENCES professores(id_professor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE faq_itens (
  id_faq              INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_topico           INT UNSIGNED,
  id_professor_criou  INT UNSIGNED,
  pergunta            TEXT          NOT NULL,
  resposta            TEXT          NOT NULL,
  palavras_chave      TEXT,
  vezes_usado         INT           DEFAULT 0,
  ativo               TINYINT(1)    DEFAULT 1,
  CONSTRAINT fk_faq_topico
    FOREIGN KEY (id_topico) REFERENCES topicos_ementa(id_topico)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================================
-- GRUPO D - MATRÍCULAS, CARGA HORÁRIA E PROGRESSO
-- =====================================================================

CREATE TABLE matriculas (
  id_matricula            INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_aluno                INT UNSIGNED  NOT NULL,
  id_disciplina           INT UNSIGNED  NOT NULL,
  id_professor_escolhido  INT UNSIGNED,
  bimestre                TINYINT       NOT NULL,
  ano_letivo              YEAR          NOT NULL,
  status                  ENUM('ativa','concluida','reprovada','isenta') DEFAULT 'ativa',
  isento_entrada_tardia   TINYINT(1)    DEFAULT 0,
  nota_final              DECIMAL(4,2),
  criado_em               DATETIME      DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_matricula (id_aluno, id_disciplina, bimestre, ano_letivo),
  CONSTRAINT fk_mat_aluno
    FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno),
  CONSTRAINT fk_mat_disc
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE progresso_video (
  id_progresso         INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_aluno             INT UNSIGNED  NOT NULL,
  id_video             INT UNSIGNED  NOT NULL,
  id_matricula         INT UNSIGNED  NOT NULL,
  segundos_assistidos  INT           DEFAULT 0,
  concluido            TINYINT(1)    DEFAULT 0,
  data_conclusao       DATETIME,
  UNIQUE KEY uk_prog (id_aluno, id_video),
  CONSTRAINT fk_prog_aluno
    FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno),
  CONSTRAINT fk_prog_video
    FOREIGN KEY (id_video) REFERENCES videoaulas(id_video)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE carga_horaria_bimestre (
  id_carga             INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_matricula         INT UNSIGNED  NOT NULL UNIQUE,
  minutos_exigidos     INT           NOT NULL,
  minutos_concluidos   INT           DEFAULT 0,
  percentual           DECIMAL(5,2)
    GENERATED ALWAYS AS (minutos_concluidos / NULLIF(minutos_exigidos,0) * 100) STORED,
  liberado_para_prova  TINYINT(1)    DEFAULT 0,
  em_recuperacao       TINYINT(1)    DEFAULT 0,
  atualizado_em        DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_carga_mat
    FOREIGN KEY (id_matricula) REFERENCES matriculas(id_matricula)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================================
-- GRUPO E - AVALIAÇÃO (PROVAS E FRAUDE)
-- =====================================================================

CREATE TABLE agendamentos_prova (
  id_agendamento   INT UNSIGNED   AUTO_INCREMENT PRIMARY KEY,
  id_matricula     INT UNSIGNED   NOT NULL,
  id_polo          INT UNSIGNED   NOT NULL,
  tipo_prova       ENUM('bimestral','2a_chamada','recuperacao') NOT NULL,
  data_hora        DATETIME       NOT NULL,
  terminal_numero  INT,
  qr_code_token    VARCHAR(128)   NOT NULL UNIQUE,
  status           ENUM('agendado','confirmado','realizado','cancelado') DEFAULT 'agendado',
  CONSTRAINT fk_ag_mat
    FOREIGN KEY (id_matricula) REFERENCES matriculas(id_matricula),
  CONSTRAINT fk_ag_polo
    FOREIGN KEY (id_polo) REFERENCES polos(id_polo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE exames (
  id_exame            INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_agendamento      INT UNSIGNED  NOT NULL UNIQUE,
  id_fiscal           INT UNSIGNED  NOT NULL,
  desbloqueado_em     DATETIME,
  iniciado_em         DATETIME,
  finalizado_em       DATETIME,
  nota                DECIMAL(4,2),
  modo_offline_usado  TINYINT(1)    DEFAULT 0,
  status              ENUM('em_curso','finalizado','anulado','sinistro') DEFAULT 'em_curso',
  CONSTRAINT fk_exame_ag
    FOREIGN KEY (id_agendamento) REFERENCES agendamentos_prova(id_agendamento),
  CONSTRAINT fk_exame_fiscal
    FOREIGN KEY (id_fiscal) REFERENCES fiscais(id_fiscal)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE alertas_fraude (
  id_alerta        INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_exame         INT UNSIGNED  NOT NULL,
  id_fiscal        INT UNSIGNED  NOT NULL,
  terminal_numero  INT           NOT NULL,
  tipo_alerta      ENUM('saida_tela','tentativa_kiosk','sinistro') NOT NULL,
  ocorrido_em      DATETIME      DEFAULT CURRENT_TIMESTAMP,
  resolvido        TINYINT(1)    DEFAULT 0,
  acao_tomada      TEXT,
  CONSTRAINT fk_alerta_exame
    FOREIGN KEY (id_exame) REFERENCES exames(id_exame),
  CONSTRAINT fk_alerta_fiscal
    FOREIGN KEY (id_fiscal) REFERENCES fiscais(id_fiscal)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================================
-- GRUPO F - SUPORTE E HISTÓRICO
-- =====================================================================

CREATE TABLE chamados_suporte (
  id_chamado      INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_aluno        INT UNSIGNED  NOT NULL,
  id_professor    INT UNSIGNED,
  id_topico       INT UNSIGNED,
  tipo            ENUM('normal','especial_tea_tdah') DEFAULT 'normal',
  pergunta_texto  TEXT,
  resolvido_faq   TINYINT(1)    DEFAULT 0,
  status          ENUM('aguardando','em_atendimento','encerrado','escalado') DEFAULT 'aguardando',
  nota_avaliacao  TINYINT,
  url_gravacao    TEXT,
  aberto_em       DATETIME      DEFAULT CURRENT_TIMESTAMP,
  encerrado_em    DATETIME,
  CONSTRAINT fk_ch_aluno
    FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno),
  CONSTRAINT fk_ch_prof
    FOREIGN KEY (id_professor) REFERENCES professores(id_professor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE relatorios_clinicos (
  id_relatorio          INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_chamado            INT UNSIGNED  NOT NULL UNIQUE,
  id_aluno              INT UNSIGNED  NOT NULL,
  id_professor_espec    INT UNSIGNED  NOT NULL,
  evolucao_texto        TEXT,
  tecnicas_usadas       TEXT,
  criado_em             DATETIME      DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rc_chamado
    FOREIGN KEY (id_chamado) REFERENCES chamados_suporte(id_chamado),
  CONSTRAINT fk_rc_aluno
    FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE historico_escolar (
  id_historico         INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  id_aluno             INT UNSIGNED  NOT NULL,
  id_disciplina        INT UNSIGNED  NOT NULL,
  ano_letivo           YEAR          NOT NULL,
  media_final          DECIMAL(4,2),
  situacao             ENUM('aprovado','retido','recuperacao','cursando') DEFAULT 'cursando',
  bimestres_validos    TINYINT,
  certificado_emitido  TINYINT(1)    DEFAULT 0,
  gerado_em            DATETIME      DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_hist (id_aluno, id_disciplina, ano_letivo),
  CONSTRAINT fk_hist_aluno
    FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno),
  CONSTRAINT fk_hist_disc
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================================
-- SEED – PAPÉIS BÁSICOS
-- =====================================================================
INSERT INTO papeis (id_papel, nome, descricao) VALUES
(1, 'aluno', 'Cursista da plataforma'),
(2, 'professor_expositor', 'Publica videoaulas'),
(3, 'professor_atendente', 'Atende plantão'),
(4, 'professor_especialista', 'TEA/TDAH'),
(5, 'fiscal', 'Fiscal do polo'),
(6, 'admin_secretaria', 'Secretaria Educação'),
(7, 'admin_municipio', 'Admin do polo');