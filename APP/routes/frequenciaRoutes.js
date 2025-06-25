const express = require('express');
const router = express.Router();
// const frequenciaController = require('../controllers/frequenciaController');

// Rotas para Frequências (a ser implementado)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Rota de listagem de frequências' });
});
router.get('/aluno/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de frequências do aluno ID: ${req.params.id}` });
});
router.get('/aula/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de frequências da aula ID: ${req.params.id}` });
});
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de frequência por ID: ${req.params.id}` });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Rota de criação de frequência', data: req.body });
});
router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de atualização de frequência ID: ${req.params.id}`, data: req.body });
});
router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de exclusão de frequência ID: ${req.params.id}` });
});

module.exports = router;
