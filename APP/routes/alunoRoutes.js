// alunoRoutes.js
// Define as rotas da API para a entidade Aluno, seguindo o padrão RESTful.
// Cada rota chama o respectivo método do controller de Aluno.

const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Rotas para Alunos
router.get('/', alunoController.listarTodos);
router.get('/busca', alunoController.buscarPorNome);
router.get('/status', alunoController.buscarPorStatus);
router.get('/:id', alunoController.buscarPorId);
router.post('/', alunoController.criar);
router.put('/:id', alunoController.atualizar);
router.delete('/:id', alunoController.excluir);

module.exports = router;
