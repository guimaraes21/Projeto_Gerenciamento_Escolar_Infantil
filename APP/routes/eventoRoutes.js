const express = require('express');
const router = express.Router();
// const eventoController = require('../controllers/eventoController');

// Rotas para Eventos (a ser implementado)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Rota de listagem de eventos' });
});
router.get('/data', (req, res) => {
    const { inicio, fim } = req.query;
    res.status(200).json({ message: `Rota de busca de eventos por período: ${inicio} a ${fim}` });
});
router.get('/tipo/:tipo', (req, res) => {
    res.status(200).json({ message: `Rota de busca de eventos por tipo: ${req.params.tipo}` });
});
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de evento por ID: ${req.params.id}` });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Rota de criação de evento', data: req.body });
});
router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de atualização de evento ID: ${req.params.id}`, data: req.body });
});
router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de exclusão de evento ID: ${req.params.id}` });
});

module.exports = router;
