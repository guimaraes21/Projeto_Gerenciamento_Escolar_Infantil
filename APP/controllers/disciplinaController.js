// disciplinaController.js
// Controller responsável por gerenciar as operações relacionadas à entidade Disciplina.
// Implementa as funções de CRUD e integra a lógica de negócio entre as rotas e o model Disciplina.

const { Disciplina } = require('../models');
const { Op } = require('sequelize');

// Controller para Disciplinas
class DisciplinaController {
    // Retorna todas as disciplinas
    async listarTodas(req, res) {
        try {
            const disciplinas = await Disciplina.findAll();
            return res.status(200).json(disciplinas);
        } catch (error) {
            console.error('Erro ao listar disciplinas:', error);
            return res.status(500).json({ message: 'Erro ao listar disciplinas', error: error.message });
        }
    }

    // Retorna uma disciplina pelo ID
    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const disciplina = await Disciplina.findByPk(id);
            
            if (!disciplina) {
                return res.status(404).json({ message: 'Disciplina não encontrada' });
            }
            
            return res.status(200).json(disciplina);
        } catch (error) {
            console.error(`Erro ao buscar disciplina ID ${id}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar disciplina', error: error.message });
        }
    }

    // Cria uma nova disciplina
    async criar(req, res) {
        const dadosDisciplina = req.body;
        try {
            const novaDisciplina = await Disciplina.create(dadosDisciplina);
            return res.status(201).json(novaDisciplina);
        } catch (error) {
            console.error('Erro ao criar disciplina:', error);
            return res.status(500).json({ message: 'Erro ao criar disciplina', error: error.message });
        }
    }

    // Atualiza uma disciplina pelo ID
    async atualizar(req, res) {
        const { id } = req.params;
        const dadosDisciplina = req.body;
        
        try {
            const disciplina = await Disciplina.findByPk(id);
            
            if (!disciplina) {
                return res.status(404).json({ message: 'Disciplina não encontrada' });
            }
            
            await disciplina.update(dadosDisciplina);
            
            return res.status(200).json(disciplina);
        } catch (error) {
            console.error(`Erro ao atualizar disciplina ID ${id}:`, error);
            return res.status(500).json({ message: 'Erro ao atualizar disciplina', error: error.message });
        }
    }

    // Remove uma disciplina pelo ID
    async excluir(req, res) {
        const { id } = req.params;
        
        try {
            const disciplina = await Disciplina.findByPk(id);
            
            if (!disciplina) {
                return res.status(404).json({ message: 'Disciplina não encontrada' });
            }
            
            await disciplina.destroy();
            
            return res.status(200).json({ message: 'Disciplina excluída com sucesso' });
        } catch (error) {
            console.error(`Erro ao excluir disciplina ID ${id}:`, error);
            return res.status(500).json({ message: 'Erro ao excluir disciplina', error: error.message });
        }
    }

    // Busca disciplinas por nome
    async buscarPorNome(req, res) {
        const { nome } = req.query;
        
        try {
            const disciplinas = await Disciplina.findAll({
                where: {
                    nome_disciplina: {
                        [Op.iLike]: `%${nome}%`
                    }
                }
            });
            
            return res.status(200).json(disciplinas);
        } catch (error) {
            console.error(`Erro ao buscar disciplinas por nome ${nome}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar disciplinas por nome', error: error.message });
        }
    }

    // Busca disciplinas por carga horária mínima
    async buscarPorCargaHoraria(req, res) {
        const { minima } = req.query;
        
        try {
            const disciplinas = await Disciplina.findAll({
                where: {
                    carga_horaria: {
                        [Op.gte]: minima
                    }
                },
                order: [['carga_horaria', 'DESC']]
            });
            
            return res.status(200).json(disciplinas);
        } catch (error) {
            console.error(`Erro ao buscar disciplinas por carga horária mínima ${minima}:`, error);
            return res.status(500).json({ message: 'Erro ao buscar disciplinas por carga horária', error: error.message });
        }
    }
}

module.exports = new DisciplinaController();
