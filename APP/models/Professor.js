// Professor.js
// Model que representa a entidade Professor no sistema.
// Define os campos, tipos e relacionamentos conforme o MER.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Professor = sequelize.define('Professor', {
    id_professor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true,
        validate: {
            is: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
        }
    },
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    data_contratacao: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    formacao_academica: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status_contrato: {
        type: DataTypes.ENUM('ativo', 'inativo', 'licença', 'férias'),
        allowNull: false,
        defaultValue: 'ativo'
    }
}, {
    tableName: 'professores',
    timestamps: true,
    underscored: true
});

module.exports = Professor;
