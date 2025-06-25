const express = require('express');
const router = express.Router();
// const requisicaoMaterialController = require('../controllers/requisicaoMaterialController');

// Rotas para Requisições de Materiais (a ser implementado)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Rota de listagem de requisições de materiais' });
});
router.get('/professor/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de requisições do professor ID: ${req.params.id}` });
});
router.get('/material/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de requisições do material ID: ${req.params.id}` });
});
router.get('/status/:status', (req, res) => {
    res.status(200).json({ message: `Rota de busca de requisições por status: ${req.params.status}` });
});
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de requisição por ID: ${req.params.id}` });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Rota de criação de requisição', data: req.body });
});
router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de atualização de requisição ID: ${req.params.id}`, data: req.body });
});
router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de exclusão de requisição ID: ${req.params.id}` });
});

module.exports = router;
