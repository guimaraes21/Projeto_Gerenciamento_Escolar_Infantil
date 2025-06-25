const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comunicado = sequelize.define('Comunicado', {
    id_comunicado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    conteudo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    data_envio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    tipo_comunicado: {
        type: DataTypes.ENUM('geral', 'turma', 'individual'),
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    publico_alvo: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'comunicados',
    timestamps: true,
    underscored: true
});

module.exports = Comunicado;
