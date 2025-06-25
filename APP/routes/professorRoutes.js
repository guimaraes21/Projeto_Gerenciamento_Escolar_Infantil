// professorRoutes.js
// Define as rotas da API para a entidade Professor, seguindo o padrão RESTful.
// Cada rota chama o respectivo método do controller de Professor.

const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

// Rotas para Professores
router.get('/', professorController.listarTodos);
router.get('/busca', professorController.buscarPorNome);
router.get('/status', professorController.buscarPorStatus);
router.get('/:id', professorController.buscarPorId);
router.post('/', professorController.criar);
router.put('/:id', professorController.atualizar);
router.delete('/:id', professorController.excluir);

module.exports = router;
