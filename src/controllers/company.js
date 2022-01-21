const express = require('express')
const companyService = require('../services/company')
const router = express.Router()

router.get('/:cnpj', async (req, res) => {
    const cnpjCompany = req.params.cnpj
    const dataCompany = await companyService().getCompanyByCnpjAndLocale(cnpjCompany)

    res.status(dataCompany.status).send(dataCompany)
})

module.exports = router