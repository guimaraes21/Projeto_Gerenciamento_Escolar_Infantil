// Disciplina.js
// Model que representa a entidade Disciplina no sistema.
// Define os campos, tipos e relacionamentos conforme o MER.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Disciplina = sequelize.define('Disciplina', {
    id_disciplina: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_disciplina: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    carga_horaria: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'disciplinas',
    timestamps: true,
    underscored: true
});

module.exports = Disciplina;
