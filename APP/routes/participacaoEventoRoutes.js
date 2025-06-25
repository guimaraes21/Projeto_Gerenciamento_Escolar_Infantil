const express = require('express');
const router = express.Router();
// const participacaoEventoController = require('../controllers/participacaoEventoController');

// Rotas para Participações em Eventos (a ser implementado)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Rota de listagem de participações em eventos' });
});
router.get('/evento/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de participações no evento ID: ${req.params.id}` });
});
router.get('/aluno/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de participações do aluno ID: ${req.params.id}` });
});
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de participação por ID: ${req.params.id}` });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Rota de criação de participação', data: req.body });
});
router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de atualização de participação ID: ${req.params.id}`, data: req.body });
});
router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de exclusão de participação ID: ${req.params.id}` });
});

module.exports = router;
