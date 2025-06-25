const express = require('express');
const router = express.Router();
// Aqui você importaria o controlador de aulas
// const aulaController = require('../controllers/aulaController');

// Rotas para Aulas (a ser implementado)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Rota de listagem de aulas' });
});
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de aula por ID: ${req.params.id}` });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Rota de criação de aula', data: req.body });
});
router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de atualização de aula ID: ${req.params.id}`, data: req.body });
});
router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de exclusão de aula ID: ${req.params.id}` });
});

module.exports = router;
