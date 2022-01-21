const express = require('express')
const companyService = require('../services/company')
const router = express.Router()

router.get('/:cnpj', async (req, res) => {
    const cnpjCompany = req.params.cnpj
    const dataCompany = await companyService().getCompanyByCnpjAndLocale(cnpjCompany, 'get')

    res.status(dataCompany.status).send(dataCompany)
})

router.patch('/:cnpj', async (req, res) => {
    const cnpjCompany = req.params.cnpj
    const dataCompany = await companyService().getCompanyByCnpjAndLocale(cnpjCompany, 'update')

    res.status(dataCompany.status).send(dataCompany)
})

router.delete('/:cnpj', async (req, res) => {
    const cnpjCompany = req.params.cnpj

    try {
        await companyService().deleteCompany(cnpjCompany)
        res.status(204).send()
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

module.exports = router