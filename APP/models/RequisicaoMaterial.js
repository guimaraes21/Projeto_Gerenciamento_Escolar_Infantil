const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Professor = require('./Professor');
const Material = require('./Material');

const RequisicaoMaterial = sequelize.define('RequisicaoMaterial', {
    id_requisicao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_professor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Professor,
            key: 'id_professor'
        }
    },
    id_material: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Material,
            key: 'id_material'
        }
    },
    data_requisicao: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    quantidade_requisitada: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    finalidade: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status_requisicao: {
        type: DataTypes.ENUM('pendente', 'aprovada', 'negada', 'devolvida'),
        allowNull: false,
        defaultValue: 'pendente'
    },
    data_devolucao_prevista: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    data_devolucao_efetiva: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    tableName: 'requisicoes_materiais',
    timestamps: true,
    underscored: true
});

// Associações
RequisicaoMaterial.belongsTo(Professor, { foreignKey: 'id_professor' });
RequisicaoMaterial.belongsTo(Material, { foreignKey: 'id_material' });

module.exports = RequisicaoMaterial;
