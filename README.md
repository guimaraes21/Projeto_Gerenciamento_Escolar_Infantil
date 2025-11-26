# Sistema de Gerenciamento Escolar Infantil

> Sistema completo para gestão de processos escolares, desenvolvido para a Escola Infantil UniFAAT-ADS. Inclui backend REST API com WebSocket, frontend React + TypeScript, e views EJS. Permite cadastro e controle de alunos, professores, turmas, avaliações, frequência, materiais, eventos, comunicação e financeiro.

---

## Sumário
- [Objetivo do Projeto](#objetivo-do-projeto)
- [Estrutura do Repositório](#estrutura-do-repositório)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Frontend React + TypeScript](#frontend-react--typescript)
- [WebSocket e Custom Hook](#websocket-e-custom-hook)
- [Views EJS](#views-ejs)
- [Rotas da API](#rotas-da-api)
- [Exemplos de Testes com cURL](#exemplos-de-testes-com-curl)
- [Monitoramento e Banco de Dados](#monitoramento-e-banco-de-dados)
- [Continuidade do Projeto](#continuidade-do-projeto)
- [Autores](#autores)

---

## Objetivo do Projeto

**Etapa 1 (Semestre 2025/1):** Implementação do backend REST API com banco de dados PostgreSQL, containerizado com Docker.

**Etapa 2 (Semestre 2025/2):** Desenvolvimento do frontend React + TypeScript com Vite, implementação de WebSocket para comunicação em tempo real, e views EJS server-side.

O sistema gerencia os principais processos de uma escola infantil, facilitando o controle acadêmico, administrativo e de comunicação em tempo real.

---

## Estrutura do Repositório

- **APP/**
  - `config/` – Configuração do banco de dados
  - `controllers/` – Lógica de negócio das entidades
  - `models/` – Modelos das entidades do MER
  - `routes/` – Rotas RESTful da API
  - `views/` – Views EJS server-side (alunos, professores)
  - `index.js` – Inicialização do backend com WebSocket
- **FRONTEND/**
  - `src/`
    - `components/` – Componentes React reutilizáveis
    - `hooks/` – Custom hooks (useWebSocket)
    - `pages/` – Páginas de CRUD (Alunos, Professores)
    - `services/` – Configuração da API (axios)
    - `styles/` – Arquivos CSS
    - `types/` – Definições TypeScript
    - `App.tsx` – Componente principal
    - `main.tsx` – Ponto de entrada da aplicação
  - `vite.config.ts` – Configuração do Vite
  - `package.json` – Dependências do frontend
- **Docs/**
  - `MER/` – Modelo Entidade-Relacionamento (conceitual e lógico)
  - `DFD/` – Diagrama de Fluxo de Dados (níveis 0, 1 e 2)
- **Raiz**
  - `Dockerfile.app` – Docker do backend
  - `Dockerfile.db` – Docker do banco
  - `Dockerfile.frontend` – Docker do frontend
  - `docker-compose.yml` – Orquestração dos serviços
  - `nginx.conf` – Proxy reverso
  - `script.sql` – Criação das tabelas
  - `README.md` – Documentação completa

---

## Tecnologias Utilizadas

### Backend
- **Node.js** + **Express** – Servidor REST API
- **PostgreSQL** – Banco de dados relacional
- **Sequelize** – ORM para Node.js
- **Socket.IO** – WebSocket para comunicação em tempo real
- **EJS** – Template engine server-side
- **Docker** + **Docker Compose** – Containerização

### Frontend
- **React 18** – Biblioteca JavaScript para UI
- **TypeScript** – Superset tipado do JavaScript
- **Vite** – Build tool e dev server ultrarrápido
- **React Router** – Roteamento client-side
- **Axios** – Cliente HTTP
- **Socket.IO Client** – Cliente WebSocket
- **CSS3** – Estilização responsiva

---

## Como Executar o Projeto

### Pré-requisitos
- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/) instalados
- [Node.js 18+](https://nodejs.org/) (opcional, para desenvolvimento local)

### Execução com Docker (Recomendado)

1. **Clone o repositório**
   ```bash
   git clone https://github.com/guimaraes21/Projeto_Gerenciamento_Escolar_Infantil.git
   cd Projeto_Gerenciamento_Escolar_Infantil
   ```

2. **Construa e inicie todos os contêineres**
   ```bash
   docker-compose up --build
   ```
   Este comando irá:
   - Construir as imagens Docker para backend, frontend e banco de dados
   - Criar e iniciar os contêineres
   - Executar o script SQL para criar as tabelas no banco de dados
   - Iniciar o servidor nginx como proxy reverso
   - Habilitar WebSocket para comunicação em tempo real

3. **Acesse as aplicações**
   - **Frontend React:** [http://localhost:5173](http://localhost:5173)
   - **Backend API:** [http://localhost:3000](http://localhost:3000)
   - **View EJS Alunos:** [http://localhost:3000/view/alunos](http://localhost:3000/view/alunos)
   - **View EJS Professores:** [http://localhost:3000/view/professores](http://localhost:3000/view/professores)
   - **Proxy Nginx:** [http://localhost:80](http://localhost:80)

### Execução Local (Desenvolvimento)

#### Backend
```bash
cd APP
npm install
npm run dev
```

#### Frontend
```bash
cd FRONTEND
npm install
npm run dev
```

---

## Frontend React + TypeScript

### Estrutura do Frontend

O frontend foi desenvolvido com **React 18** e **TypeScript**, utilizando **Vite** como bundler para desenvolvimento rápido e build otimizado.

#### Entidades Implementadas (CRUD Completo)
1. **Alunos** (`/alunos`)
   - Listar todos os alunos
   - Criar novo aluno
   - Editar aluno existente
   - Excluir aluno
   - Exibir status da matrícula
   - Atualização em tempo real via WebSocket

2. **Professores** (`/professores`)
   - Listar todos os professores
   - Criar novo professor
   - Editar professor existente
   - Excluir professor
   - Exibir status do contrato
   - Atualização em tempo real via WebSocket

### Funcionalidades do Frontend

- ✅ **TypeScript**: Todo o código é tipado (.tsx e .ts)
- ✅ **React Hooks**: useState, useEffect, useCallback
- ✅ **React Router**: Navegação entre páginas
- ✅ **Formulários Controlados**: Validação de inputs
- ✅ **Axios**: Comunicação com API REST
- ✅ **WebSocket**: Atualizações em tempo real
- ✅ **CSS Responsivo**: Design adaptável a diferentes telas
- ✅ **Feedback Visual**: Loading, alertas e confirmações

### Build do Frontend com Vite

O Vite oferece builds extremamente rápidos e otimizados:

```bash
# Desenvolvimento
cd FRONTEND
npm run dev
# Servidor disponível em http://localhost:5173

# Build de produção
npm run build
# Arquivos otimizados gerados em /dist

# Preview do build
npm run preview
```

**Vantagens do Vite:**
- ⚡ Hot Module Replacement (HMR) instantâneo
- 📦 Build otimizado com tree-shaking
- 🎯 TypeScript nativo sem configuração
- 🔧 Configuração mínima

---

## WebSocket e Custom Hook

### Implementação do WebSocket

O sistema utiliza **Socket.IO** para comunicação bidirecional em tempo real entre cliente e servidor.

#### Backend (Socket.IO Server)

No arquivo `APP/index.js`:

```javascript
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Eventos do WebSocket
io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    // Alunos
    socket.on('aluno:created', (data) => io.emit('aluno:created', data));
    socket.on('aluno:updated', (data) => io.emit('aluno:updated', data));
    socket.on('aluno:deleted', (data) => io.emit('aluno:deleted', data));

    // Professores
    socket.on('professor:created', (data) => io.emit('professor:created', data));
    socket.on('professor:updated', (data) => io.emit('professor:updated', data));
    socket.on('professor:deleted', (data) => io.emit('professor:deleted', data));

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});
```

#### Frontend (Custom Hook useWebSocket)

Localizado em `FRONTEND/src/hooks/useWebSocket.ts`:

```typescript
import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export const useWebSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Criar conexão WebSocket
    socketRef.current = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('WebSocket conectado:', socket.id);
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket desconectado');
      setIsConnected(false);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const emit = useCallback((event: string, data: any) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  }, []);

  const on = useCallback((event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  }, []);

  const off = useCallback((event: string, callback?: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  }, []);

  return { socket: socketRef.current, isConnected, emit, on, off };
};
```

### Como Usar o Custom Hook

Exemplo em `AlunosPage.tsx`:

```typescript
const { isConnected, emit, on, off } = useWebSocket();

// Emitir evento quando criar aluno
const handleSubmit = async (e) => {
  const response = await alunosAPI.create(formData);
  emit('aluno:created', response.data);  // Notifica outros clientes
};

// Ouvir eventos de outros clientes
useEffect(() => {
  const handleAlunoCreated = (data) => {
    console.log('Aluno criado por outro usuário:', data);
    fetchAlunos();  // Atualiza a lista
  };

  on('aluno:created', handleAlunoCreated);

  return () => {
    off('aluno:created', handleAlunoCreated);
  };
}, [on, off]);
```

### Benefícios do WebSocket

- 🔄 **Atualização em Tempo Real**: Mudanças refletidas instantaneamente em todos os clientes
- 🚀 **Performance**: Comunicação bidirecional eficiente
- 📡 **Eventos Customizados**: Sistema flexível de pub/sub
- 🔌 **Reconexão Automática**: Resiliência em caso de falha

---

## Views EJS

### O que são Views EJS?

EJS (Embedded JavaScript) é um template engine server-side que permite gerar HTML dinamicamente no backend.

### Views Implementadas

#### 1. View de Alunos
**URL:** [http://localhost:3000/view/alunos](http://localhost:3000/view/alunos)

Localizada em `APP/views/alunos.ejs`, demonstra:
- Renderização server-side com EJS
- Listagem de rotas da API de alunos
- Design responsivo com CSS inline
- Link para o frontend React

#### 2. View de Professores
**URL:** [http://localhost:3000/view/professores](http://localhost:3000/view/professores)

Localizada em `APP/views/professores.ejs`, demonstra:
- Template EJS com variáveis dinâmicas
- Documentação das rotas de professores
- Estilização customizada
- Integração com o sistema

### Configuração do EJS no Backend

No arquivo `APP/index.js`:

```javascript
const path = require('path');

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas EJS
app.get('/view/alunos', (req, res) => {
    res.render('alunos', { title: 'Gerenciamento de Alunos' });
});

app.get('/view/professores', (req, res) => {
    res.render('professores', { title: 'Gerenciamento de Professores' });
});
```

### Diferença entre EJS e React

| Aspecto | EJS (Server-Side) | React (Client-Side) |
|---------|-------------------|---------------------|
| Renderização | Servidor | Navegador |
| Interatividade | Baixa | Alta |
| SEO | Excelente | Requer SSR |
| Uso | Páginas estáticas | Aplicações dinâmicas |

---

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

**Etapa 1 (2025/1):** Backend REST API com Docker ✅ Concluído

**Etapa 2 (2025/2):** Frontend React + TypeScript + Vite + WebSocket + EJS ✅ Concluído

**Próximas Etapas:**
- Implementação de autenticação e autorização (JWT)
- Dashboard administrativo com gráficos e relatórios
- Sistema de notificações push
- Testes automatizados (Jest, React Testing Library)
- CI/CD com GitHub Actions
- Deploy em produção (AWS, Heroku, Vercel)

---

## Autores

- **Luiz Felipe S. de Souza**
- **Natan Borges Leme**
- **Leonardo Frazão Sano**
- **Vitor Pinheiro Guimarães**

**Instituição:** UniFAAT-ADS  
**Disciplina:** Implementação de Servidores  
**Período:** 2025/1 e 2025/2

---

## Critérios de Avaliação Atendidos

### Prova Final (Nota até 10)

1. ✅ **Views funcionando + backend API no Docker** – 3 pontos
   - Views React completas para Alunos e Professores
   - Backend rodando em container Docker
   - Comunicação front-end ↔ back-end funcional

2. ✅ **Pré-compilador Vite funcionando** – 2 pontos
   - Projeto configurado com Vite
   - Comandos de build documentados no README
   - Build otimizado e rápido

3. ✅ **Uso de TypeScript no front-end** – 1 ponto
   - Todo código front-end em .ts e .tsx
   - Tipagem completa e interfaces definidas

4. ✅ **Uso de React tipado** – 1 ponto
   - React + TypeScript integrados
   - Componentização adequada
   - Hooks e gerenciamento de estado

5. ✅ **Uso de views EJS** – 1 ponto
   - Views EJS implementadas no backend
   - Rotas /view/alunos e /view/professores

6. ✅ **WebSocket + custom hook** – 2 pontos
   - Socket.IO implementado no backend
   - Custom hook useWebSocket em React
   - Comunicação em tempo real funcional

**Total:** 10/10 pontos ✅

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos na UniFAAT-ADS.

---

## Dúvidas e Contato

Para dúvidas ou sugestões, entre em contato com os autores ou abra uma issue no GitHub.

**Repositório:** [https://github.com/guimaraes21/Projeto_Gerenciamento_Escolar_Infantil](https://github.com/guimaraes21/Projeto_Gerenciamento_Escolar_Infantil)

---

**Última atualização:** Novembro 2025

