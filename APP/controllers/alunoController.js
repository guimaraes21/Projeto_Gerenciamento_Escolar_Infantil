// alunoController.js
// Controller responsável por gerenciar as operações relacionadas à entidade Aluno.
// Implementa as funções de CRUD e integra a lógica de negócio entre as rotas e o model Aluno.

const { Aluno } = require('../models');
const { Op } = require('sequelize');

// Controller para Alunos
class AlunoController {
    // Retorna todos os alunos
    async listarTodos(req, res) {
        try {
            const alunos = await Aluno.findAll();
            return res.status(200).json(alunos);
        } catch (error) {
            console.error('Erro ao listar alunos:', error);
            return res.status(500).json({ message: 'Erro ao listar alunos', error: error.message });
        }
    }

    // Retorna um aluno pelo ID
    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const aluno = await Aluno.findByPk(id);
            
            if (!aluno) {
                return res.status(404).json({ message: 'Aluno não encontrado' });
            }
            
            return res.status(200).json(aluno);
        } catch (error) {
            console.error(`Erro ao buscar aluno ID ${id}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar aluno', error: error.message });
        }
    }

    // Cria um novo aluno
    async criar(req, res) {
        const dadosAluno = req.body;
        try {
            const novoAluno = await Aluno.create(dadosAluno);
            return res.status(201).json(novoAluno);
        } catch (error) {
            console.error('Erro ao criar aluno:', error);
            return res.status(500).json({ message: 'Erro ao criar aluno', error: error.message });
        }
    }

    // Atualiza um aluno pelo ID
    async atualizar(req, res) {
        const { id } = req.params;
        const dadosAluno = req.body;
        
        try {
            const aluno = await Aluno.findByPk(id);
            
            if (!aluno) {
                return res.status(404).json({ message: 'Aluno não encontrado' });
            }
            
            await aluno.update(dadosAluno);
            
            return res.status(200).json(aluno);
        } catch (error) {
            console.error(`Erro ao atualizar aluno ID ${id}:`, error);
            return res.status(500).json({ message: 'Erro ao atualizar aluno', error: error.message });
        }
    }

    // Remove um aluno pelo ID
    async excluir(req, res) {
        const { id } = req.params;
        
        try {
            const aluno = await Aluno.findByPk(id);
            
            if (!aluno) {
                return res.status(404).json({ message: 'Aluno não encontrado' });
            }
            
            await aluno.destroy();
            
            return res.status(200).json({ message: 'Aluno excluído com sucesso' });
        } catch (error) {
            console.error(`Erro ao excluir aluno ID ${id}:`, error);
            return res.status(500).json({ message: 'Erro ao excluir aluno', error: error.message });
        }
    }

    // Busca alunos por nome
    async buscarPorNome(req, res) {
        const { nome } = req.query;
        
        try {
            const alunos = await Aluno.findAll({
                where: {
                    nome: {
                        [Op.iLike]: `%${nome}%`
                    }
                }
            });
            
            return res.status(200).json(alunos);
        } catch (error) {
            console.error(`Erro ao buscar alunos por nome ${nome}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar alunos por nome', error: error.message });
        }
    }

    // Busca alunos por status de matrícula
    async buscarPorStatus(req, res) {
        const { status } = req.query;
        
        try {
            const alunos = await Aluno.findAll({
                where: {
                    status_matricula: status
                }
            });
            
            return res.status(200).json(alunos);
        } catch (error) {
            console.error(`Erro ao buscar alunos por status ${status}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar alunos por status', error: error.message });
        }
    }
}

module.exports = new AlunoController();
