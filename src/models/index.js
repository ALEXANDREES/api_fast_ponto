const configSequelize = require('../configuration/sequelize')
const Company = require('./entityCompany')

const db = {
    Company,
    configSequelize: configSequelize
}

module.exports = db