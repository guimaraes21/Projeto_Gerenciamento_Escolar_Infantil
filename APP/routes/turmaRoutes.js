// turmaRoutes.js
// Define as rotas da API para a entidade Turma, seguindo o padrão RESTful.
// Cada rota chama o respectivo método do controller de Turma.

const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

// Rotas para Turmas
router.get('/', turmaController.listarTodas);
router.get('/ano', turmaController.buscarPorAnoLetivo);
router.get('/periodo', turmaController.buscarPorPeriodo);
router.get('/professor', turmaController.buscarPorProfessor);
router.get('/:id', turmaController.buscarPorId);
router.post('/', turmaController.criar);
router.put('/:id', turmaController.atualizar);
router.delete('/:id', turmaController.excluir);

module.exports = router;
