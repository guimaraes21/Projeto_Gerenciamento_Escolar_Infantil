const express = require('express');
const router = express.Router();
// const pagamentoController = require('../controllers/pagamentoController');

// Rotas para Pagamentos (a ser implementado)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Rota de listagem de pagamentos' });
});
router.get('/matricula/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de pagamentos da matrícula ID: ${req.params.id}` });
});
router.get('/status/:status', (req, res) => {
    res.status(200).json({ message: `Rota de busca de pagamentos por status: ${req.params.status}` });
});
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de pagamento por ID: ${req.params.id}` });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Rota de criação de pagamento', data: req.body });
});
router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de atualização de pagamento ID: ${req.params.id}`, data: req.body });
});
router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de exclusão de pagamento ID: ${req.params.id}` });
});

module.exports = router;
