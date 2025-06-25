// index.js
// Arquivo principal do backend. Inicializa o servidor Express, configura middlewares, registra as rotas das entidades e inicia a aplicação.


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database');

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
const PORT = process.env.PORT || 3000;

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

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
