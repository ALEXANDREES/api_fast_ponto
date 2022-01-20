const Sequelize = require('sequelize')
const configSequelize = require('../configuration/sequelize')

const Company = configSequelize.define('EntityCompany', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING(14),
        unique: true,
        allowNull: false
    },
    corporateName: {
        type: Sequelize.STRING(100),
        allowNull: false
    }, 
    fantasyName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    mainActivity: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    openingDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    legalNature: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING(8),
        allowNull: false
    },
    publicPlace: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    ibgeCode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    state: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    country: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'entitycompany'
})

module.exports = Company