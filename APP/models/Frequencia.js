const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Aluno = require('./Aluno');
const Aula = require('./Aula');

const Frequencia = sequelize.define('Frequencia', {
    id_frequencia: {
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
    id_aula: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Aula,
            key: 'id_aula'
        }
    },
    presente: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    justificativa_falta: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'frequencias',
    timestamps: true,
    underscored: true
});

// Associações
Frequencia.belongsTo(Aluno, { foreignKey: 'id_aluno' });
Frequencia.belongsTo(Aula, { foreignKey: 'id_aula' });

module.exports = Frequencia;
