const express = require('express')
const { Company } = require('../models/index')
const CompanyService = require('../services/company')
const router = express.Router()

const companyService = new CompanyService(Company)

router.get('/:cnpj', async (req, res) => {
    const cnpjCompany = req.params.cnpj
    const resultCompany = await companyService.getCompanyByCnpj(cnpjCompany)

    if (resultCompany.status !== 'ERROR') {
        res.status(200).send({
            status: 200,
            message: 'Company found successfully',
            company: resultCompany
        })
    } else {
        res.status(404).send({
            status: 404,
            message: 'Company not found',
            error: resultCompany
        })
    }
})

module.exports = router