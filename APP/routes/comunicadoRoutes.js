const express = require('express');
const router = express.Router();
// const comunicadoController = require('../controllers/comunicadoController');

// Rotas para Comunicados (a ser implementado)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Rota de listagem de comunicados' });
});
router.get('/tipo/:tipo', (req, res) => {
    res.status(200).json({ message: `Rota de busca de comunicados por tipo: ${req.params.tipo}` });
});
router.get('/publico/:publico', (req, res) => {
    res.status(200).json({ message: `Rota de busca de comunicados por público alvo: ${req.params.publico}` });
});
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de comunicado por ID: ${req.params.id}` });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Rota de criação de comunicado', data: req.body });
});
router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de atualização de comunicado ID: ${req.params.id}`, data: req.body });
});
router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de exclusão de comunicado ID: ${req.params.id}` });
});

module.exports = router;
