# Instruções de Instalação e Execução

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- **Docker Desktop** (Windows/Mac) ou **Docker Engine** (Linux)
- **Docker Compose** (geralmente incluído no Docker Desktop)
- **Node.js 18+** (opcional, apenas para desenvolvimento local)

## 🚀 Início Rápido com Docker

### 1. Clone o Repositório
```powershell
git clone https://github.com/guimaraes21/Projeto_Gerenciamento_Escolar_Infantil.git
cd Projeto_Gerenciamento_Escolar_Infantil
```

### 2. Inicie Todos os Serviços
```powershell
docker-compose up --build
```

**O que acontece:**
- 🗄️ Banco de dados PostgreSQL é criado e inicializado
- 🔧 Backend Node.js é iniciado com WebSocket
- ⚛️ Frontend React é compilado e servido
- 🌐 Nginx é configurado como proxy reverso

### 3. Acesse as Aplicações

Aguarde alguns segundos e acesse:

- **Frontend React:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **View EJS Alunos:** http://localhost:3000/view/alunos
- **View EJS Professores:** http://localhost:3000/view/professores

### 4. Parar os Serviços
```powershell
# Parar containers
docker-compose down

# Parar e remover volumes (limpar banco de dados)
docker-compose down -v
```

## 💻 Desenvolvimento Local (Sem Docker)

### Backend

```powershell
cd APP
npm install
npm run dev
```
Servidor rodando em http://localhost:3000

### Frontend

```powershell
cd FRONTEND
npm install
npm run dev
```
Aplicação rodando em http://localhost:5173

### Banco de Dados

Certifique-se de ter PostgreSQL instalado e configure as variáveis de ambiente no arquivo `APP/.env`:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=escola_infantil
DB_PORT=5432
PORT=3000
```

## 🔨 Build de Produção

### Frontend

```powershell
cd FRONTEND
npm run build
```

Os arquivos otimizados serão gerados na pasta `FRONTEND/dist/`

### Preview do Build

```powershell
npm run preview
```

## 🧪 Testando a API

### Com cURL (PowerShell)

```powershell
# Listar alunos
curl http://localhost:3000/api/alunos

# Criar aluno
curl -X POST http://localhost:3000/api/alunos `
  -H "Content-Type: application/json" `
  -d '{
    "nome": "João Silva",
    "data_nascimento": "2020-05-15",
    "genero": "Masculino",
    "endereco": "Rua Teste, 123",
    "telefone_contato": "(11) 99999-9999",
    "nome_responsavel": "Maria Silva",
    "cpf_responsavel": "123.456.789-00",
    "email_responsavel": "maria@email.com"
  }'
```

### Com Postman ou Insomnia

Importe a URL base: `http://localhost:3000/api`

## 🐛 Solução de Problemas

### Porta já em uso

Se aparecer erro de porta ocupada:

```powershell
# Encontrar processo usando a porta 3000
netstat -ano | findstr :3000

# Matar o processo (substitua PID)
taskkill /PID <PID> /F
```

### Containers não iniciam

```powershell
# Ver logs
docker-compose logs -f

# Reconstruir do zero
docker-compose down -v
docker-compose up --build
```

### Problemas com node_modules

```powershell
# Limpar cache
cd APP
Remove-Item -Recurse -Force node_modules
npm install

cd ..\FRONTEND
Remove-Item -Recurse -Force node_modules
npm install
```

## 📚 Recursos Adicionais

- [Documentação do Docker](https://docs.docker.com/)
- [Documentação do React](https://react.dev/)
- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do Socket.IO](https://socket.io/docs/)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)

## 📞 Suporte

Em caso de dúvidas, consulte o README.md principal ou abra uma issue no GitHub.
