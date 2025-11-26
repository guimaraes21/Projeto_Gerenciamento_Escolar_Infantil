// index.js
// Arquivo principal do backend. Inicializa o servidor Express, configura middlewares, registra as rotas das entidades e inicia a aplicação.


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Importação das rotas
const alunoRoutes = require('./routes/alunoRoutes');
const professorRoutes = require('./routes/professorRoutes');
const turmaRoutes = require('./routes/turmaRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const aulaRoutes = require('./routes/aulaRoutes');
const frequenciaRoutes = require('./routes/frequenciaRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');
const matriculaRoutes = require('./routes/matriculaRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');
const materialRoutes = require('./routes/materialRoutes');
const requisicaoMaterialRoutes = require('./routes/requisicaoMaterialRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const participacaoEventoRoutes = require('./routes/participacaoEventoRoutes');
const comunicadoRoutes = require('./routes/comunicadoRoutes');
const recebimentoComunicadoRoutes = require('./routes/recebimentoComunicadoRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});
const PORT = process.env.PORT || 3000;

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Teste de conexão com o banco
db.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

// Definição das rotas
app.use('/api/alunos', alunoRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/turmas', turmaRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api/aulas', aulaRoutes);
app.use('/api/frequencias', frequenciaRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/matriculas', matriculaRoutes);
app.use('/api/pagamentos', pagamentoRoutes);
app.use('/api/materiais', materialRoutes);
app.use('/api/requisicoes-materiais', requisicaoMaterialRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/participacoes-eventos', participacaoEventoRoutes);
app.use('/api/comunicados', comunicadoRoutes);
app.use('/api/recebimentos-comunicados', recebimentoComunicadoRoutes);

// Rota padrão
app.get('/', (req, res) => {
    res.send('API do Sistema de Gerenciamento Escolar Infantil');
});

// Rota EJS de exemplo
app.get('/view/alunos', (req, res) => {
    res.render('alunos', { title: 'Gerenciamento de Alunos' });
});

app.get('/view/professores', (req, res) => {
    res.render('professores', { title: 'Gerenciamento de Professores' });
});

// WebSocket - Gerenciamento de eventos em tempo real
io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    // Evento quando um aluno é criado
    socket.on('aluno:created', (data) => {
        console.log('Aluno criado:', data);
        io.emit('aluno:created', data);
    });

    // Evento quando um aluno é atualizado
    socket.on('aluno:updated', (data) => {
        console.log('Aluno atualizado:', data);
        io.emit('aluno:updated', data);
    });

    // Evento quando um aluno é deletado
    socket.on('aluno:deleted', (data) => {
        console.log('Aluno deletado:', data);
        io.emit('aluno:deleted', data);
    });

    // Evento quando um professor é criado
    socket.on('professor:created', (data) => {
        console.log('Professor criado:', data);
        io.emit('professor:created', data);
    });

    // Evento quando um professor é atualizado
    socket.on('professor:updated', (data) => {
        console.log('Professor atualizado:', data);
        io.emit('professor:updated', data);
    });

    // Evento quando um professor é deletado
    socket.on('professor:deleted', (data) => {
        console.log('Professor deletado:', data);
        io.emit('professor:deleted', data);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

// Disponibilizar io para as rotas
app.set('io', io);

// Inicialização do servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`WebSocket habilitado`);
});

module.exports = { app, io };
