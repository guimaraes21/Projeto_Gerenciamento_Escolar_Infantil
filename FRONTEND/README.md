# Frontend - Sistema de Gerenciamento Escolar Infantil

> Interface React + TypeScript desenvolvida com Vite para gerenciamento de alunos e professores.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para UI
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool ultrarrápido
- **Socket.IO Client** - WebSocket para tempo real
- **Axios** - Cliente HTTP
- **React Router** - Roteamento client-side
- **CSS3** - Estilização responsiva

## 📁 Estrutura

```
src/
├── components/       # Componentes reutilizáveis
├── hooks/           # Custom hooks (useWebSocket)
├── pages/           # Páginas principais
│   ├── AlunosPage.tsx
│   └── ProfessoresPage.tsx
├── services/        # Configuração API
│   └── api.ts
├── styles/          # Arquivos CSS
│   ├── Alunos.css
│   └── Professores.css
├── types/           # Interfaces TypeScript
│   └── index.ts
├── App.tsx          # Componente raiz
├── main.tsx         # Entry point
└── vite-env.d.ts    # Tipos Vite
```

## 🎯 Funcionalidades

### CRUD de Alunos
- ✅ Listar todos os alunos
- ✅ Criar novo aluno
- ✅ Editar aluno existente
- ✅ Excluir aluno
- ✅ Filtrar e pesquisar
- ✅ Validação de formulários

### CRUD de Professores
- ✅ Listar todos os professores
- ✅ Criar novo professor
- ✅ Editar professor existente
- ✅ Excluir professor
- ✅ Exibir status do contrato
- ✅ Formatação de dados

### WebSocket em Tempo Real
- ✅ Atualizações instantâneas
- ✅ Indicador de conexão
- ✅ Reconexão automática
- ✅ Custom hook `useWebSocket`

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## 🌐 URLs

- **Dev Server:** http://localhost:5173
- **API Backend:** http://localhost:3000
- **WebSocket:** ws://localhost:3000

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

### TypeScript

O projeto utiliza configuração strict do TypeScript:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "jsx": "react-jsx"
  }
}
```

## 📖 Uso do Custom Hook useWebSocket

```typescript
import { useWebSocket } from './hooks/useWebSocket';

const MyComponent = () => {
  const { isConnected, emit, on, off } = useWebSocket();

  useEffect(() => {
    // Ouvir eventos
    const handleEvent = (data) => {
      console.log('Evento recebido:', data);
    };

    on('event:name', handleEvent);

    return () => {
      off('event:name', handleEvent);
    };
  }, [on, off]);

  // Emitir eventos
  const sendEvent = () => {
    emit('event:name', { data: 'example' });
  };

  return (
    <div>
      Status: {isConnected ? 'Conectado' : 'Desconectado'}
    </div>
  );
};
```

## 🎨 Componentes Principais

### AlunosPage

Página completa de CRUD para alunos:

```typescript
import AlunosPage from './pages/AlunosPage';

// Funcionalidades:
// - Listagem com tabela
// - Formulário de criação/edição
// - Validação de campos
// - Confirmação de exclusão
// - WebSocket para atualizações
```

### ProfessoresPage

Página completa de CRUD para professores:

```typescript
import ProfessoresPage from './pages/ProfessoresPage';

// Funcionalidades:
// - Listagem com tabela
// - Formulário de criação/edição
// - Campos específicos (CPF, formação)
// - Status do contrato
// - WebSocket para atualizações
```

## 🔌 API Service

Serviço centralizado para chamadas HTTP:

```typescript
import { alunosAPI, professoresAPI } from './services/api';

// Alunos
const alunos = await alunosAPI.getAll();
const aluno = await alunosAPI.getById(1);
await alunosAPI.create(data);
await alunosAPI.update(1, data);
await alunosAPI.delete(1);

// Professores
const professores = await professoresAPI.getAll();
const professor = await professoresAPI.getById(1);
await professoresAPI.create(data);
await professoresAPI.update(1, data);
await professoresAPI.delete(1);
```

## 🎯 Tipos TypeScript

### Interfaces Principais

```typescript
interface Aluno {
  id_aluno?: number;
  nome: string;
  data_nascimento: string;
  genero: string;
  endereco: string;
  telefone_contato: string;
  nome_responsavel: string;
  cpf_responsavel: string;
  email_responsavel: string;
  status_matricula?: string;
}

interface Professor {
  id_professor?: number;
  nome: string;
  cpf: string;
  data_nascimento: string;
  genero: string;
  endereco: string;
  telefone: string;
  email: string;
  data_contratacao: string;
  formacao_academica: string;
  status_contrato?: string;
}
```

## 🚀 Performance

### Vite HMR

O Vite oferece Hot Module Replacement instantâneo:

- Atualizações de código em < 100ms
- Preservação do estado da aplicação
- Build otimizado para produção

### Code Splitting

O Vite automaticamente divide o código em chunks:

```
dist/
├── index.html
├── assets/
│   ├── index.[hash].js
│   ├── vendor.[hash].js
│   └── style.[hash].css
```

## 🧪 Testes

### Testar Localmente

```bash
# Modo desenvolvimento
npm run dev

# Testar build
npm run build
npm run preview
```

### Testar com Backend

Certifique-se de que o backend está rodando:

```bash
# Terminal 1 - Backend
cd ../APP
npm run dev

# Terminal 2 - Frontend
cd FRONTEND
npm run dev
```

## 📱 Responsividade

O design é totalmente responsivo:

- **Desktop:** Layout em grid, tabelas completas
- **Tablet:** Ajuste de colunas, menus adaptados
- **Mobile:** Layout vertical, tabelas simplificadas

## 🎨 Estilização

### CSS Modular

Cada página tem seu próprio arquivo CSS:

- `Alunos.css` - Estilos da página de alunos
- `Professores.css` - Estilos da página de professores
- `App.css` - Estilos globais
- `index.css` - Reset e variáveis CSS

### Variáveis CSS

```css
:root {
  --primary-color: #2196f3;
  --success-color: #4caf50;
  --danger-color: #f44336;
  --warning-color: #ff9800;
}
```

## 🔧 Scripts Disponíveis

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## 📦 Dependências

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "socket.io-client": "^4.7.2",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.8"
  }
}
```

## 🐛 Troubleshooting

### Erro de módulos não encontrados

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build falha

```bash
npm run build -- --verbose
```

### WebSocket não conecta

Verifique se o backend está rodando e se a URL está correta no `.env`

## 📚 Recursos

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)

## 👥 Contribuidores

- Luiz Felipe S. de Souza
- Natan Borges Leme
- Leonardo Frazão Sano
- Vitor Pinheiro Guimarães

---

**UniFAAT-ADS - 2025**
