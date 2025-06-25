// professorController.js
// Controller responsável por gerenciar as operações relacionadas à entidade Professor.
// Implementa as funções de CRUD e integra a lógica de negócio entre as rotas e o model Professor.

const { Professor } = require('../models');
const { Op } = require('sequelize');

// Controller para Professores
class ProfessorController {
    // Retorna todos os professores
    async listarTodos(req, res) {
        try {
            const professores = await Professor.findAll();
            return res.status(200).json(professores);
        } catch (error) {
            console.error('Erro ao listar professores:', error);
            return res.status(500).json({ message: 'Erro ao listar professores', error: error.message });
        }
    }

    // Retorna um professor pelo ID
    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const professor = await Professor.findByPk(id);
            
            if (!professor) {
                return res.status(404).json({ message: 'Professor não encontrado' });
            }
            
            return res.status(200).json(professor);
        } catch (error) {
            console.error(`Erro ao buscar professor ID ${id}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar professor', error: error.message });
        }
    }

    // Cria um novo professor
    async criar(req, res) {
        const dadosProfessor = req.body;
        try {
            const novoProfessor = await Professor.create(dadosProfessor);
            return res.status(201).json(novoProfessor);
        } catch (error) {
            console.error('Erro ao criar professor:', error);
            return res.status(500).json({ message: 'Erro ao criar professor', error: error.message });
        }
    }

    // Atualiza um professor pelo ID
    async atualizar(req, res) {
        const { id } = req.params;
        const dadosProfessor = req.body;
        
        try {
            const professor = await Professor.findByPk(id);
            
            if (!professor) {
                return res.status(404).json({ message: 'Professor não encontrado' });
            }
            
            await professor.update(dadosProfessor);
            
            return res.status(200).json(professor);
        } catch (error) {
            console.error(`Erro ao atualizar professor ID ${id}:`, error);
            return res.status(500).json({ message: 'Erro ao atualizar professor', error: error.message });
        }
    }

    // Remove um professor pelo ID
    async excluir(req, res) {
        const { id } = req.params;
        
        try {
            const professor = await Professor.findByPk(id);
            
            if (!professor) {
                return res.status(404).json({ message: 'Professor não encontrado' });
            }
            
            await professor.destroy();
            
            return res.status(200).json({ message: 'Professor excluído com sucesso' });
        } catch (error) {
            console.error(`Erro ao excluir professor ID ${id}:`, error);
            return res.status(500).json({ message: 'Erro ao excluir professor', error: error.message });
        }
    }

    // Busca professores por nome
    async buscarPorNome(req, res) {
        const { nome } = req.query;
        
        try {
            const professores = await Professor.findAll({
                where: {
                    nome: {
                        [Op.iLike]: `%${nome}%`
                    }
                }
            });
            
            return res.status(200).json(professores);
        } catch (error) {
            console.error(`Erro ao buscar professores por nome ${nome}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar professores por nome', error: error.message });
        }
    }

    // Busca professores por status de contrato
    async buscarPorStatus(req, res) {
        const { status } = req.query;
        
        try {
            const professores = await Professor.findAll({
                where: {
                    status_contrato: status
                }
            });
            
            return res.status(200).json(professores);
        } catch (error) {
            console.error(`Erro ao buscar professores por status ${status}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar professores por status', error: error.message });
        }
    }
}

module.exports = new ProfessorController();
