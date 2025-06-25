// database.js
// Arquivo de configuração da conexão com o banco de dados PostgreSQL.
// Define parâmetros como host, usuário, senha, nome do banco e exporta a instância de conexão para uso nos models.

const { Sequelize } = require('sequelize');

// Configurações do banco de dados
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbHost = process.env.DB_HOST || 'db';
const dbPort = process.env.DB_PORT || '5432';
const dbName = process.env.DB_NAME || 'escola_infantil';

// Criando a instância do Sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;
