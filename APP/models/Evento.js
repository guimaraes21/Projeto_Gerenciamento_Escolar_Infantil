const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Evento = sequelize.define('Evento', {
    id_evento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_evento: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    local: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    responsavel: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tipo_evento: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'eventos',
    timestamps: true,
    underscored: true
});

module.exports = Evento;
