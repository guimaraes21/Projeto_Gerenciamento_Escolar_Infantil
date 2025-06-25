const express = require('express');
const router = express.Router();
// const matriculaController = require('../controllers/matriculaController');

// Rotas para Matrículas (a ser implementado)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Rota de listagem de matrículas' });
});
router.get('/aluno/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de matrículas do aluno ID: ${req.params.id}` });
});
router.get('/turma/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de matrículas da turma ID: ${req.params.id}` });
});
router.get('/status/:status', (req, res) => {
    res.status(200).json({ message: `Rota de busca de matrículas por status: ${req.params.status}` });
});
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de busca de matrícula por ID: ${req.params.id}` });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Rota de criação de matrícula', data: req.body });
});
router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de atualização de matrícula ID: ${req.params.id}`, data: req.body });
});
router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Rota de exclusão de matrícula ID: ${req.params.id}` });
});

module.exports = router;
