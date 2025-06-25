const express = require('express');
const router = express.Router();
// const materialController = require('../controllers/materialController');

// Rotas para Materiais (a ser implementado)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Rota de listagem de materiais' });
});
router.get('/disponivel', (req, res) => {
    res.status(200).json({ message: 'Rota de busca de materiais disponíveis' });
});
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de material por ID: ${req.params.id}` });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Rota de criação de material', data: req.body });
});
router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de atualização de material ID: ${req.params.id}`, data: req.body });
});
router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de exclusão de material ID: ${req.params.id}` });
});

module.exports = router;
