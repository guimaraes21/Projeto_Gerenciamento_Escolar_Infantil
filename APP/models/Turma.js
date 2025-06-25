// Turma.js
// Model que representa a entidade Turma no sistema.
// Define os campos, tipos e relacionamentos conforme o MER.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Professor = require('./Professor');

const Turma = sequelize.define('Turma', {
    id_turma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_turma: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ano_letivo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    periodo: {
        type: DataTypes.ENUM('matutino', 'vespertino', 'integral'),
        allowNull: false
    },
    capacidade_maxima: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_professor_responsavel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Professor,
            key: 'id_professor'
        }
    },
    faixa_etaria: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    sala: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'turmas',
    timestamps: true,
    underscored: true
});

// Associação com Professor
Turma.belongsTo(Professor, { 
    foreignKey: 'id_professor_responsavel',
    as: 'professorResponsavel'
});

module.exports = Turma;
