# 🎯 COMANDOS RÁPIDOS PARA DEMONSTRAÇÃO

## 🚀 Iniciar o Projeto

### Windows PowerShell
```powershell
# Navegar até a pasta do projeto
cd "c:\Users\Programação\Desktop\Exercicios Faculdade\TFS\TF12SERVIDOR\tf12servidor\PROJETO PROVA\Projeto_Gerenciamento_Escolar_Infantil"

# Iniciar todos os containers
docker-compose up --build

# Aguardar ~30 segundos e acessar:
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
# View EJS Alunos: http://localhost:3000/view/alunos
# View EJS Professores: http://localhost:3000/view/professores
```

## 📊 Verificar Containers Rodando

```powershell
# Listar containers ativos
docker ps

# Ver logs do backend
docker-compose logs -f app

# Ver logs do frontend
docker-compose logs -f frontend

# Ver logs do banco
docker-compose logs -f db
```

## 🧪 Testar API com cURL

### Listar Alunos
```powershell
curl http://localhost:3000/api/alunos
```

### Criar Aluno
```powershell
curl -X POST http://localhost:3000/api/alunos `
  -H "Content-Type: application/json" `
  -d '{
    "nome": "Maria Silva",
    "data_nascimento": "2020-03-15",
    "genero": "Feminino",
    "endereco": "Rua das Flores, 456",
    "telefone_contato": "(11) 98888-7777",
    "nome_responsavel": "José Silva",
    "cpf_responsavel": "987.654.321-00",
    "email_responsavel": "jose.silva@email.com"
  }'
```

### Listar Professores
```powershell
curl http://localhost:3000/api/professores
```

### Criar Professor
```powershell
curl -X POST http://localhost:3000/api/professores `
  -H "Content-Type: application/json" `
  -d '{
    "nome": "Roberto Almeida",
    "cpf": "111.222.333-44",
    "data_nascimento": "1985-07-20",
    "genero": "Masculino",
    "endereco": "Av. Central, 789",
    "telefone": "(11) 99999-8888",
    "email": "roberto@escola.com",
    "data_contratacao": "2025-01-10",
    "formacao_academica": "Pedagogia"
  }'
```

## 🔍 Verificar Banco de Dados

```powershell
# Acessar o container do PostgreSQL
docker exec -it escola_infantil_db psql -U postgres -d escola_infantil

# Dentro do PostgreSQL:
# Listar tabelas
\dt

# Ver alunos
SELECT * FROM alunos;

# Ver professores
SELECT * FROM professores;

# Sair
\q
```

## 🛠️ Build do Frontend

```powershell
# Navegar até o frontend
cd FRONTEND

# Instalar dependências (se necessário)
npm install

# Build de produção
npm run build

# Preview do build
npm run preview
```

## 📂 Estrutura de Arquivos Importantes

```powershell
# Ver estrutura do projeto
tree /F /A

# Listar arquivos TypeScript
Get-ChildItem -Path FRONTEND\src -Filter *.tsx -Recurse | Select-Object Name, FullName

Get-ChildItem -Path FRONTEND\src -Filter *.ts -Recurse | Select-Object Name, FullName
```

## 🔄 Reiniciar Projeto

```powershell
# Parar containers
docker-compose down

# Parar e limpar volumes (reset completo)
docker-compose down -v

# Reconstruir do zero
docker-compose up --build
```

## 📝 Ver Logs em Tempo Real

```powershell
# Todos os logs
docker-compose logs -f

# Apenas backend
docker-compose logs -f app

# Apenas frontend
docker-compose logs -f frontend

# Apenas banco
docker-compose logs -f db
```

## 🌐 URLs Importantes

```
Frontend React:          http://localhost:5173
Backend API:             http://localhost:3000
View EJS Alunos:         http://localhost:3000/view/alunos
View EJS Professores:    http://localhost:3000/view/professores
API Alunos:              http://localhost:3000/api/alunos
API Professores:         http://localhost:3000/api/professores
Nginx Proxy:             http://localhost:80
```

## 🎬 Roteiro de Demonstração

### 1. Mostrar Estrutura do Projeto
```powershell
# Listar pastas principais
Get-ChildItem -Directory
```

### 2. Iniciar Docker
```powershell
docker-compose up --build
```

### 3. Demonstrar Frontend React
- Acessar http://localhost:5173
- Navegar para /alunos
- Criar novo aluno
- Editar aluno
- Mostrar atualização em tempo real (WebSocket)

### 4. Demonstrar Views EJS
- Acessar http://localhost:3000/view/alunos
- Acessar http://localhost:3000/view/professores

### 5. Testar API com cURL
```powershell
# Listar alunos
curl http://localhost:3000/api/alunos

# Criar professor
curl -X POST http://localhost:3000/api/professores `
  -H "Content-Type: application/json" `
  -d '{"nome":"Teste","cpf":"123.456.789-00",...}'
```

### 6. Mostrar WebSocket
- Abrir duas janelas do navegador
- Criar aluno em uma janela
- Observar atualização automática na outra janela

### 7. Demonstrar TypeScript
```powershell
# Abrir arquivos no VS Code
code FRONTEND\src\types\index.ts
code FRONTEND\src\hooks\useWebSocket.ts
code FRONTEND\src\pages\AlunosPage.tsx
```

### 8. Demonstrar Build Vite
```powershell
cd FRONTEND
npm run build
# Mostrar pasta dist/
Get-ChildItem dist\
```

### 9. Verificar Containers Docker
```powershell
docker ps
docker-compose logs -f app
```

### 10. Mostrar Banco de Dados
```powershell
docker exec -it escola_infantil_db psql -U postgres -d escola_infantil -c "SELECT * FROM alunos;"
```

## 🎓 Pontos a Destacar na Apresentação

1. ✅ **Arquitetura Completa:** Frontend React + Backend Node.js + PostgreSQL
2. ✅ **TypeScript:** Todo código front-end tipado
3. ✅ **Vite:** Build ultrarrápido e HMR
4. ✅ **WebSocket:** Comunicação em tempo real com custom hook
5. ✅ **EJS:** Views server-side renderizadas
6. ✅ **Docker:** Ambiente totalmente containerizado
7. ✅ **CRUD Completo:** Duas entidades (Alunos e Professores)
8. ✅ **Design Moderno:** Interface responsiva e intuitiva

## 🆘 Troubleshooting Rápido

### Porta ocupada
```powershell
# Encontrar processo
netstat -ano | findstr :3000
# Matar processo
taskkill /PID <PID> /F
```

### Containers não sobem
```powershell
docker-compose down -v
docker-compose up --build
```

### Frontend não atualiza
```powershell
cd FRONTEND
Remove-Item -Recurse -Force node_modules
npm install
```

## 📞 Comandos de Emergência

```powershell
# Parar tudo
docker-compose down

# Limpar tudo
docker-compose down -v
docker system prune -a

# Recomeçar do zero
docker-compose up --build
```

---

**Boa sorte na apresentação! 🚀**
