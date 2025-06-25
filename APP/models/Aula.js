const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Turma = require('./Turma');
const Disciplina = require('./Disciplina');
const Professor = require('./Professor');

const Aula = sequelize.define('Aula', {
    id_aula: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_turma: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Turma,
            key: 'id_turma'
        }
    },
    id_disciplina: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Disciplina,
            key: 'id_disciplina'
        }
    },
    id_professor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Professor,
            key: 'id_professor'
        }
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    hora_fim: {
        type: DataTypes.TIME,
        allowNull: false
    },
    conteudo_previsto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status_realizada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'aulas',
    timestamps: true,
    underscored: true
});

// Associações
Aula.belongsTo(Turma, { foreignKey: 'id_turma' });
Aula.belongsTo(Disciplina, { foreignKey: 'id_disciplina' });
Aula.belongsTo(Professor, { foreignKey: 'id_professor' });

module.exports = Aula;
