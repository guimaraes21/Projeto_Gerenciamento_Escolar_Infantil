const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Evento = require('./Evento');
const Aluno = require('./Aluno');

const ParticipacaoEvento = sequelize.define('ParticipacaoEvento', {
    id_participacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_evento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Evento,
            key: 'id_evento'
        }
    },
    id_aluno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Aluno,
            key: 'id_aluno'
        }
    },
    presenca: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'participacoes_eventos',
    timestamps: true,
    underscored: true
});

// Associações
ParticipacaoEvento.belongsTo(Evento, { foreignKey: 'id_evento' });
ParticipacaoEvento.belongsTo(Aluno, { foreignKey: 'id_aluno' });

module.exports = ParticipacaoEvento;
