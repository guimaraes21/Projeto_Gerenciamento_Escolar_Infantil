// disciplinaRoutes.js
// Define as rotas da API para a entidade Disciplina, seguindo o padrão RESTful.
// Cada rota chama o respectivo método do controller de Disciplina.

const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');

// Rotas para Disciplinas
router.get('/', disciplinaController.listarTodas);
router.get('/busca', disciplinaController.buscarPorNome);
router.get('/carga-horaria', disciplinaController.buscarPorCargaHoraria);
router.get('/:id', disciplinaController.buscarPorId);
router.post('/', disciplinaController.criar);
router.put('/:id', disciplinaController.atualizar);
router.delete('/:id', disciplinaController.excluir);

module.exports = router;
