const express = require('express')
const companyRouters = require('./company')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send({
        status: 200,
        message: 'API is online!',
    })
})

router.use('/company', companyRouters)

module.exports = router