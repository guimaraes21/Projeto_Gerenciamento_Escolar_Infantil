// turmaController.js
// Controller responsável por gerenciar as operações relacionadas à entidade Turma.
// Implementa as funções de CRUD e integra a lógica de negócio entre as rotas e o model Turma.

const { Turma, Professor } = require('../models');
const { Op } = require('sequelize');

// Controller para Turmas
class TurmaController {
    // Retorna todas as turmas
    async listarTodas(req, res) {
        try {
            const turmas = await Turma.findAll({
                include: [{
                    model: Professor,
                    as: 'professorResponsavel',
                    attributes: ['id_professor', 'nome']
                }]
            });
            return res.status(200).json(turmas);
        } catch (error) {
            console.error('Erro ao listar turmas:', error);
            return res.status(500).json({ message: 'Erro ao listar turmas', error: error.message });
        }
    }

    // Retorna uma turma pelo ID
    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const turma = await Turma.findByPk(id, {
                include: [{
                    model: Professor,
                    as: 'professorResponsavel',
                    attributes: ['id_professor', 'nome']
                }]
            });
            
            if (!turma) {
                return res.status(404).json({ message: 'Turma não encontrada' });
            }
            
            return res.status(200).json(turma);
        } catch (error) {
            console.error(`Erro ao buscar turma ID ${id}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar turma', error: error.message });
        }
    }

    // Cria uma nova turma
    async criar(req, res) {
        const dadosTurma = req.body;
        try {
            // Verifica se o professor existe
            const professor = await Professor.findByPk(dadosTurma.id_professor_responsavel);
            
            if (!professor) {
                return res.status(404).json({ message: 'Professor responsável não encontrado' });
            }

            const novaTurma = await Turma.create(dadosTurma);
            return res.status(201).json(novaTurma);
        } catch (error) {
            console.error('Erro ao criar turma:', error);
            return res.status(500).json({ message: 'Erro ao criar turma', error: error.message });
        }
    }

    // Atualiza uma turma pelo ID
    async atualizar(req, res) {
        const { id } = req.params;
        const dadosTurma = req.body;
        
        try {
            const turma = await Turma.findByPk(id);
            
            if (!turma) {
                return res.status(404).json({ message: 'Turma não encontrada' });
            }
            
            // Se estiver mudando o professor responsável, verifica se ele existe
            if (dadosTurma.id_professor_responsavel && 
                dadosTurma.id_professor_responsavel !== turma.id_professor_responsavel) {
                
                const professor = await Professor.findByPk(dadosTurma.id_professor_responsavel);
                
                if (!professor) {
                    return res.status(404).json({ message: 'Professor responsável não encontrado' });
                }
            }
            
            await turma.update(dadosTurma);
            
            // Busca a turma atualizada com os dados do professor
            const turmaAtualizada = await Turma.findByPk(id, {
                include: [{
                    model: Professor,
                    as: 'professorResponsavel',
                    attributes: ['id_professor', 'nome']
                }]
            });
            
            return res.status(200).json(turmaAtualizada);
        } catch (error) {
            console.error(`Erro ao atualizar turma ID ${id}:`, error);
            return res.status(500).json({ message: 'Erro ao atualizar turma', error: error.message });
        }
    }

    // Remove uma turma pelo ID
    async excluir(req, res) {
        const { id } = req.params;
        
        try {
            const turma = await Turma.findByPk(id);
            
            if (!turma) {
                return res.status(404).json({ message: 'Turma não encontrada' });
            }
            
            await turma.destroy();
            
            return res.status(200).json({ message: 'Turma excluída com sucesso' });
        } catch (error) {
            console.error(`Erro ao excluir turma ID ${id}:`, error);
            return res.status(500).json({ message: 'Erro ao excluir turma', error: error.message });
        }
    }

    // Busca turmas por ano letivo
    async buscarPorAnoLetivo(req, res) {
        const { ano } = req.query;
        
        try {
            const turmas = await Turma.findAll({
                where: {
                    ano_letivo: ano
                },
                include: [{
                    model: Professor,
                    as: 'professorResponsavel',
                    attributes: ['id_professor', 'nome']
                }]
            });
            
            return res.status(200).json(turmas);
        } catch (error) {
            console.error(`Erro ao buscar turmas por ano letivo ${ano}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar turmas por ano letivo', error: error.message });
        }
    }

    // Busca turmas por período
    async buscarPorPeriodo(req, res) {
        const { periodo } = req.query;
        
        try {
            const turmas = await Turma.findAll({
                where: {
                    periodo
                },
                include: [{
                    model: Professor,
                    as: 'professorResponsavel',
                    attributes: ['id_professor', 'nome']
                }]
            });
            
            return res.status(200).json(turmas);
        } catch (error) {
            console.error(`Erro ao buscar turmas por período ${periodo}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar turmas por período', error: error.message });
        }
    }

    // Busca turmas por professor responsável
    async buscarPorProfessor(req, res) {
        const { id_professor } = req.query;
        
        try {
            const turmas = await Turma.findAll({
                where: {
                    id_professor_responsavel: id_professor
                },
                include: [{
                    model: Professor,
                    as: 'professorResponsavel',
                    attributes: ['id_professor', 'nome']
                }]
            });
            
            return res.status(200).json(turmas);
        } catch (error) {
            console.error(`Erro ao buscar turmas por professor ID ${id_professor}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar turmas por professor', error: error.message });
        }
    }
}

module.exports = new TurmaController();
