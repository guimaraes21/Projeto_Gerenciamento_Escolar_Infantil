const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Aluno = require('./Aluno');
const Turma = require('./Turma');

const Matricula = sequelize.define('Matricula', {
    id_matricula: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_aluno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Aluno,
            key: 'id_aluno'
        }
    },
    id_turma: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Turma,
            key: 'id_turma'
        }
    },
    data_matricula: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status_matricula: {
        type: DataTypes.ENUM('ativa', 'inativa', 'trancada', 'transferida'),
        allowNull: false,
        defaultValue: 'ativa'
    }
}, {
    tableName: 'matriculas',
    timestamps: true,
    underscored: true
});

// Associações
Matricula.belongsTo(Aluno, { foreignKey: 'id_aluno' });
Matricula.belongsTo(Turma, { foreignKey: 'id_turma' });

module.exports = Matricula;
