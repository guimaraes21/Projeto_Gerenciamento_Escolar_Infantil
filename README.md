# Sistema de Gerenciamento Escolar Infantil

> Backend para gestão de processos escolares, desenvolvido para a Escola Infantil UniFAAT-ADS. Permite cadastro e controle de alunos, professores, turmas, avaliações, frequência, materiais, eventos, comunicação e financeiro.

---

## Sumário
- [Objetivo do Projeto](#objetivo-do-projeto)
- [Estrutura do Repositório](#estrutura-do-repositório)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Rotas da API](#rotas-da-api)
- [Exemplos de Testes com cURL](#exemplos-de-testes-com-curl)
- [Monitoramento e Banco de Dados](#monitoramento-e-banco-de-dados)
- [Continuidade do Projeto](#continuidade-do-projeto)
- [Autores](#autores)
- [Dúvidas e Contato](#dúvidas-e-contato)

---

## Objetivo do Projeto

Gerenciar os principais processos de uma escola infantil, facilitando o controle acadêmico, administrativo e de comunicação.

---

## Estrutura do Repositório

- **APP/**
  - `config/` – Configuração do banco de dados
  - `controllers/` – Lógica de negócio das entidades
  - `models/` – Modelos das entidades do MER
  - `routes/` – Rotas RESTful da API
  - `index.js` – Inicialização do backend
- **Docs/**
  - `MER.txt` – Modelo Entidade-Relacionamento
  - `DFD.txt` – Diagrama de Fluxo de Dados
- **Raiz**
  - `Dockerfile.app` – Docker do backend
  - `Dockerfile.db` – Docker do banco
  - `docker-compose.yml` – Orquestração dos serviços
  - `nginx.conf` – Proxy reverso
  - `script.sql` – Criação das tabelas
  - `README.md` – Documentação

---

## Como Executar o Projeto

### Pré-requisitos
- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/) instalados

### Passos para Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/guimaraes21/Projeto_Gerenciamento_Escolar_Infantil.git
   ```
2. **Construa e inicie os contêineres**
   ```bash
   docker-compose up --build
   ```
   Este comando irá:
   - Construir as imagens Docker para o backend e banco de dados
   - Criar e iniciar os contêineres
   - Executar o script SQL para criar as tabelas no banco de dados
   - Iniciar o servidor nginx como proxy reverso
3. **Acesse a aplicação**
   - A API estará disponível em: [http://localhost:3000](http://localhost:3000)
   - Para testar se a API está funcionando, acesse: [http://localhost:3000/api/alunos](http://localhost:3000/api/alunos)

---

## Rotas da API

Todas as rotas seguem o padrão RESTful e retornam JSON.

### Entidades Principais
- **Alunos**
- **Professores**
- **Turmas**
- **Avaliações**
- **Frequência**
- **Materiais**
- **Eventos**
- **Comunicados**
- **Pagamentos**

### Exemplos de Rotas

#### Alunos
- `GET /api/alunos` – Lista todos os alunos
- `GET /api/alunos/:id` – Busca aluno por ID
- `POST /api/alunos` – Cria novo aluno
- `PUT /api/alunos/:id` – Atualiza aluno
- `DELETE /api/alunos/:id` – Remove aluno

Payload para criação:
```json
{
  "nome": "Maria Silva",
  "data_nascimento": "2020-04-15",
  "genero": "Feminino",
  "endereco": "Rua das Flores, 123",
  "telefone_contato": "(11) 99999-1234",
  "nome_responsavel": "José Silva",
  "cpf_responsavel": "111.222.333-44",
  "email_responsavel": "jose.silva@email.com"
}
```

#### Professores
- `GET /api/professores` – Lista todos os professores
- `GET /api/professores/:id` – Busca professor por ID
- `POST /api/professores` – Cria novo professor
- `PUT /api/professores/:id` – Atualiza professor
- `DELETE /api/professores/:id` – Remove professor

Payload para criação:
```json
{
  "nome": "Roberto Almeida",
  "cpf": "444.555.666-77",
  "data_nascimento": "1982-06-20",
  "genero": "Masculino",
  "endereco": "Av. Principal, 500",
  "telefone": "(11) 98888-5555",
  "email": "roberto.almeida@escola.com",
  "data_contratacao": "2023-01-10",
  "formacao_academica": "Pedagogia",
  "status_contrato": "ativo"
}
```

#### Turmas
- `GET /api/turmas` – Lista todas as turmas
- `GET /api/turmas/:id` – Busca turma por ID
- `POST /api/turmas` – Cria nova turma
- `PUT /api/turmas/:id` – Atualiza turma
- `DELETE /api/turmas/:id` – Remove turma

Payload para criação:
```json
{
  "nome_turma": "Turminha D",
  "ano_letivo": 2025,
  "periodo": "vespertino",
  "capacidade_maxima": 18,
  "id_professor_responsavel": 1,
  "faixa_etaria": "4-5 anos",
  "sala": "Sala 04"
}
```

#### Outras Entidades
- O sistema possui rotas para todas as entidades do MER (avaliações, frequência, materiais, eventos, comunicados, pagamentos, etc.), seguindo o mesmo padrão RESTful.

---

## Exemplos de Testes com cURL

Listar todos os alunos:
```bash
curl -X GET http://localhost:3000/api/alunos
```

Buscar aluno por ID:
```bash
curl -X GET http://localhost:3000/api/alunos/1
```

Criar novo aluno:
```bash
curl -X POST http://localhost:3000/api/alunos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Silva",
    "data_nascimento": "2020-04-15",
    "genero": "Feminino",
    "endereco": "Rua das Flores, 123",
    "telefone_contato": "(11) 99999-1234",
    "nome_responsavel": "José Silva",
    "cpf_responsavel": "111.222.333-44",
    "email_responsavel": "jose.silva@email.com"
  }'
```

Atualizar dados de um aluno:
```bash
curl -X PUT http://localhost:3000/api/alunos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "telefone_contato": "(11) 99999-8888",
    "endereco": "Rua das Margaridas, 50"
  }'
```

Excluir um professor:
```bash
curl -X DELETE http://localhost:3000/api/professores/3
```

Listar pagamentos de uma matrícula específica:
```bash
curl -X GET http://localhost:3000/api/pagamentos/matricula/1
```

Buscar avaliações de um aluno:
```bash
curl -X GET http://localhost:3000/api/avaliacoes/aluno/2
```

Buscar frequências de uma aula:
```bash
curl -X GET http://localhost:3000/api/frequencias/aula/1
```

---

## Monitoramento e Banco de Dados

- Para acompanhar os logs do backend:
  ```bash
  docker-compose logs -f app
  ```
- Para acessar o banco de dados diretamente:
  ```bash
  docker exec -it escola_infantil_db psql -U postgres -d escola_infantil -c "SELECT * FROM alunos;"
  ```

---

## Continuidade do Projeto

Este projeto terá continuidade com o desenvolvimento do frontend e a implementação de CI/CD para automação de testes e deploy.

---

## Autores

- Luiz Felipe S. de Souza
- Natan Borges Leme
- Leonardo Frazão Sano
- Vitor Pinheiro Guimarães

---

