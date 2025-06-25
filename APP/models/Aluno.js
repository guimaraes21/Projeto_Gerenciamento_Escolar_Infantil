// Aluno.js
// Model que representa a entidade Aluno no sistema.
// Define os campos, tipos e relacionamentos conforme o MER.
// Utilize este model para operações de CRUD e integrações com controllers e rotas.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Aluno = sequelize.define('Aluno', {
    id_aluno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
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
    telefone_contato: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    nome_responsavel: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cpf_responsavel: {
        type: DataTypes.STRING(14),
        allowNull: false,
        validate: {
            is: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
        }
    },
    email_responsavel: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    data_matricula: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status_matricula: {
        type: DataTypes.ENUM('ativo', 'inativo', 'trancado', 'transferido'),
        allowNull: false,
        defaultValue: 'ativo'
    }
}, {
    tableName: 'alunos',
    timestamps: true,
    underscored: true
});

module.exports = Aluno;
