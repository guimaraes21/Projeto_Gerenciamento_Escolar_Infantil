const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Comunicado = require('./Comunicado');

const RecebimentoComunicado = sequelize.define('RecebimentoComunicado', {
    id_recebimento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_comunicado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Comunicado,
            key: 'id_comunicado'
        }
    },
    id_responsavel: {
        type: DataTypes.STRING(14), // CPF do responsável
        allowNull: false
    },
    data_visualizacao: {
        type: DataTypes.DATE,
        allowNull: true
    },
    confirmacao_leitura: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'recebimentos_comunicados',
    timestamps: true,
    underscored: true
});

// Associações
RecebimentoComunicado.belongsTo(Comunicado, { foreignKey: 'id_comunicado' });

module.exports = RecebimentoComunicado;
