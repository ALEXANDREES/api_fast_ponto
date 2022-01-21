const express = require('express')
const companyRouters = require('./company')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('App online!')
})

router.use('/company', companyRouters)

module.exports = router