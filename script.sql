-- script.sql
-- Este arquivo contém os comandos SQL para criar o banco de dados e todas as tabelas necessárias conforme o MER do sistema de gerenciamento escolar infantil.


-- Drop tables if they exist
DROP TABLE IF EXISTS recebimentos_comunicados;
DROP TABLE IF EXISTS comunicados;
DROP TABLE IF EXISTS participacoes_eventos;
DROP TABLE IF EXISTS eventos;
DROP TABLE IF EXISTS requisicoes_materiais;
DROP TABLE IF EXISTS materiais;
DROP TABLE IF EXISTS pagamentos;
DROP TABLE IF EXISTS matriculas;
DROP TABLE IF EXISTS avaliacoes;
DROP TABLE IF EXISTS frequencias;
DROP TABLE IF EXISTS aulas;
DROP TABLE IF EXISTS disciplinas;
DROP TABLE IF EXISTS turmas;
DROP TABLE IF EXISTS professores;
DROP TABLE IF EXISTS alunos;

-- Criação da tabela Alunos
CREATE TABLE alunos (
    id_aluno SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    genero VARCHAR(20) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    telefone_contato VARCHAR(20) NOT NULL,
    nome_responsavel VARCHAR(100) NOT NULL,
    cpf_responsavel VARCHAR(14) NOT NULL,
    email_responsavel VARCHAR(100) NOT NULL,
    data_matricula DATE NOT NULL DEFAULT CURRENT_DATE,
    status_matricula VARCHAR(20) NOT NULL DEFAULT 'ativo',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela Professores
CREATE TABLE professores (
    id_professor SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    genero VARCHAR(20) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    data_contratacao DATE NOT NULL,
    formacao_academica VARCHAR(100) NOT NULL,
    status_contrato VARCHAR(20) NOT NULL DEFAULT 'ativo',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela Turmas
CREATE TABLE turmas (
    id_turma SERIAL PRIMARY KEY,
    nome_turma VARCHAR(50) NOT NULL,
    ano_letivo INTEGER NOT NULL,
    periodo VARCHAR(20) NOT NULL,
    capacidade_maxima INTEGER NOT NULL,
    id_professor_responsavel INTEGER NOT NULL,
    faixa_etaria VARCHAR(50) NOT NULL,
    sala VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_professor_responsavel) REFERENCES professores(id_professor)
);

-- Criação da tabela Disciplinas
CREATE TABLE disciplinas (
    id_disciplina SERIAL PRIMARY KEY,
    nome_disciplina VARCHAR(100) NOT NULL,
    descricao TEXT,
    carga_horaria INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela Aulas
CREATE TABLE aulas (
    id_aula SERIAL PRIMARY KEY,
    id_turma INTEGER NOT NULL,
    id_disciplina INTEGER NOT NULL,
    id_professor INTEGER NOT NULL,
    data DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    conteudo_previsto TEXT,
    status_realizada BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_turma) REFERENCES turmas(id_turma),
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina),
    FOREIGN KEY (id_professor) REFERENCES professores(id_professor)
);

-- Criação da tabela Frequências
CREATE TABLE frequencias (
    id_frequencia SERIAL PRIMARY KEY,
    id_aluno INTEGER NOT NULL,
    id_aula INTEGER NOT NULL,
    presente BOOLEAN NOT NULL DEFAULT true,
    justificativa_falta TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno),
    FOREIGN KEY (id_aula) REFERENCES aulas(id_aula)
);

-- Criação da tabela Avaliações
CREATE TABLE avaliacoes (
    id_avaliacao SERIAL PRIMARY KEY,
    id_aluno INTEGER NOT NULL,
    id_disciplina INTEGER NOT NULL,
    data_avaliacao DATE NOT NULL,
    tipo_avaliacao VARCHAR(50) NOT NULL,
    descricao TEXT,
    conceito VARCHAR(10) NOT NULL,
    observacoes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno),
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina)
);

-- Criação da tabela Matrículas
CREATE TABLE matriculas (
    id_matricula SERIAL PRIMARY KEY,
    id_aluno INTEGER NOT NULL,
    id_turma INTEGER NOT NULL,
    data_matricula DATE NOT NULL DEFAULT CURRENT_DATE,
    status_matricula VARCHAR(20) NOT NULL DEFAULT 'ativa',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno),
    FOREIGN KEY (id_turma) REFERENCES turmas(id_turma)
);

-- Criação da tabela Pagamentos
CREATE TABLE pagamentos (
    id_pagamento SERIAL PRIMARY KEY,
    id_matricula INTEGER NOT NULL,
    data_vencimento DATE NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_pagamento DATE,
    status_pagamento VARCHAR(20) NOT NULL DEFAULT 'pendente',
    forma_pagamento VARCHAR(50),
    observacoes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_matricula) REFERENCES matriculas(id_matricula)
);

-- Criação da tabela Materiais
CREATE TABLE materiais (
    id_material SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    quantidade_disponivel INTEGER NOT NULL DEFAULT 0,
    localizacao_estoque VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela Requisições de Materiais
CREATE TABLE requisicoes_materiais (
    id_requisicao SERIAL PRIMARY KEY,
    id_professor INTEGER NOT NULL,
    id_material INTEGER NOT NULL,
    data_requisicao DATE NOT NULL DEFAULT CURRENT_DATE,
    quantidade_requisitada INTEGER NOT NULL,
    finalidade TEXT NOT NULL,
    status_requisicao VARCHAR(20) NOT NULL DEFAULT 'pendente',
    data_devolucao_prevista DATE,
    data_devolucao_efetiva DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_professor) REFERENCES professores(id_professor),
    FOREIGN KEY (id_material) REFERENCES materiais(id_material)
);

-- Criação da tabela Eventos
CREATE TABLE eventos (
    id_evento SERIAL PRIMARY KEY,
    nome_evento VARCHAR(100) NOT NULL,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL,
    descricao TEXT,
    local VARCHAR(100) NOT NULL,
    responsavel VARCHAR(100) NOT NULL,
    tipo_evento VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela Participações em Eventos
CREATE TABLE participacoes_eventos (
    id_participacao SERIAL PRIMARY KEY,
    id_evento INTEGER NOT NULL,
    id_aluno INTEGER NOT NULL,
    presenca BOOLEAN,
    observacoes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento),
    FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno)
);

-- Criação da tabela Comunicados
CREATE TABLE comunicados (
    id_comunicado SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    conteudo TEXT NOT NULL,
    data_envio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo_comunicado VARCHAR(20) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    publico_alvo VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela Recebimentos de Comunicados
CREATE TABLE recebimentos_comunicados (
    id_recebimento SERIAL PRIMARY KEY,
    id_comunicado INTEGER NOT NULL,
    id_responsavel VARCHAR(14) NOT NULL, -- CPF do responsável
    data_visualizacao TIMESTAMP,
    confirmacao_leitura BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_comunicado) REFERENCES comunicados(id_comunicado)
);

-- Inserir alguns dados de exemplo para testes

-- Inserir professores
INSERT INTO professores (nome, cpf, data_nascimento, genero, endereco, telefone, email, data_contratacao, formacao_academica, status_contrato)
VALUES 
('Ana Paula Silva', '123.456.789-00', '1985-03-15', 'Feminino', 'Rua das Flores, 100', '(11) 98765-4321', 'ana.silva@escola.com', '2020-01-10', 'Pedagogia', 'ativo'),
('Carlos Eduardo Santos', '987.654.321-00', '1980-07-22', 'Masculino', 'Av. Principal, 200', '(11) 91234-5678', 'carlos.santos@escola.com', '2021-02-15', 'Educação Física', 'ativo'),
('Mariana Oliveira', '456.789.123-00', '1990-11-05', 'Feminino', 'Rua do Sol, 50', '(11) 95555-1234', 'mariana.oliveira@escola.com', '2019-08-01', 'Artes', 'ativo');

-- Inserir disciplinas
INSERT INTO disciplinas (nome_disciplina, descricao, carga_horaria)
VALUES 
('Alfabetização', 'Desenvolvimento da leitura e escrita', 100),
('Matemática Básica', 'Conceitos fundamentais de matemática', 80),
('Artes', 'Expressão artística e criatividade', 60),
('Educação Física', 'Desenvolvimento motor e atividades físicas', 60);

-- Inserir turmas
INSERT INTO turmas (nome_turma, ano_letivo, periodo, capacidade_maxima, id_professor_responsavel, faixa_etaria, sala)
VALUES 
('Turminha A', 2025, 'matutino', 20, 1, '4-5 anos', 'Sala 01'),
('Turminha B', 2025, 'vespertino', 20, 2, '5-6 anos', 'Sala 02'),
('Turminha C', 2025, 'integral', 15, 3, '3-4 anos', 'Sala 03');

-- Inserir alunos
INSERT INTO alunos (nome, data_nascimento, genero, endereco, telefone_contato, nome_responsavel, cpf_responsavel, email_responsavel)
VALUES 
('Pedro Henrique', '2020-05-10', 'Masculino', 'Rua das Margaridas, 45', '(11) 97777-8888', 'Maria Silva', '111.222.333-44', 'maria.silva@email.com'),
('Julia Santos', '2021-03-22', 'Feminino', 'Av. das Palmeiras, 100', '(11) 96666-7777', 'João Santos', '222.333.444-55', 'joao.santos@email.com'),
('Lucas Oliveira', '2020-01-15', 'Masculino', 'Rua dos Ipês, 200', '(11) 95555-6666', 'Ana Oliveira', '333.444.555-66', 'ana.oliveira@email.com');

-- Inserir matrículas
INSERT INTO matriculas (id_aluno, id_turma, data_matricula, status_matricula)
VALUES 
(1, 1, '2025-01-15', 'ativa'),
(2, 2, '2025-01-20', 'ativa'),
(3, 3, '2025-01-10', 'ativa');
