const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Matricula = require('./Matricula');

const Pagamento = sequelize.define('Pagamento', {
    id_pagamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_matricula: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Matricula,
            key: 'id_matricula'
        }
    },
    data_vencimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    data_pagamento: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    status_pagamento: {
        type: DataTypes.ENUM('pendente', 'pago', 'atrasado', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendente'
    },
    forma_pagamento: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'pagamentos',
    timestamps: true,
    underscored: true
});

// Associações
Pagamento.belongsTo(Matricula, { foreignKey: 'id_matricula' });

module.exports = Pagamento;
