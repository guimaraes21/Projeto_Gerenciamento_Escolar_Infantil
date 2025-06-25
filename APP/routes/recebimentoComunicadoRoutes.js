const express = require('express');
const router = express.Router();
// const recebimentoComunicadoController = require('../controllers/recebimentoComunicadoController');

// Rotas para Recebimentos de Comunicados (a ser implementado)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Rota de listagem de recebimentos de comunicados' });
});
router.get('/comunicado/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de recebimentos do comunicado ID: ${req.params.id}` });
});
router.get('/responsavel/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de recebimentos pelo responsável ID: ${req.params.id}` });
});
router.get('/confirmados', (req, res) => {
    res.status(200).json({ message: 'Rota de busca de comunicados confirmados' });
});
router.get('/pendentes', (req, res) => {
    res.status(200).json({ message: 'Rota de busca de comunicados pendentes de confirmação' });
});
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de recebimento por ID: ${req.params.id}` });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Rota de criação de recebimento', data: req.body });
});
router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de atualização de recebimento ID: ${req.params.id}`, data: req.body });
});
router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de exclusão de recebimento ID: ${req.params.id}` });
});

module.exports = router;
