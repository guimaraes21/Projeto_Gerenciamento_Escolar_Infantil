const express = require('express');
const router = express.Router();
// const avaliacaoController = require('../controllers/avaliacaoController');

// Rotas para Avaliações (a ser implementado)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Rota de listagem de avaliações' });
});
router.get('/aluno/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de avaliações do aluno ID: ${req.params.id}` });
});
router.get('/disciplina/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de avaliações da disciplina ID: ${req.params.id}` });
});
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de avaliação por ID: ${req.params.id}` });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Rota de criação de avaliação', data: req.body });
});
router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de atualização de avaliação ID: ${req.params.id}`, data: req.body });
});
router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de exclusão de avaliação ID: ${req.params.id}` });
});

module.exports = router;
