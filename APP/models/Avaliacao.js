const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Aluno = require('./Aluno');
const Disciplina = require('./Disciplina');

const Avaliacao = sequelize.define('Avaliacao', {
    id_avaliacao: {
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
    id_disciplina: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Disciplina,
            key: 'id_disciplina'
        }
    },
    data_avaliacao: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    tipo_avaliacao: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    conceito: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'avaliacoes',
    timestamps: true,
    underscored: true
});

// Associações
Avaliacao.belongsTo(Aluno, { foreignKey: 'id_aluno' });
Avaliacao.belongsTo(Disciplina, { foreignKey: 'id_disciplina' });

module.exports = Avaliacao;
