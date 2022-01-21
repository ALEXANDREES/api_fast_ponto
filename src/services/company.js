const axios = require('axios').default
const { Company } = require('../models/index')

const companyService = () => {
    const getCompanyByCnpjAndLocale = async (cnpjDto, typeConsult) => {
        let resultCompany = {}

        await axios.get('https://www.receitaws.com.br/v1/cnpj/'+cnpjDto).then(async (res) => {
            if (res.data.status !== 'ERROR') {
                var dateFormatParts = res.data.abertura.split('/')
                var newDateFormat = new Date(+dateFormatParts[2], dateFormatParts[1] - 1, +dateFormatParts[0])
    
                resultCompany = { 
                    cnpj: res.data.cnpj.replace(/\D+/g, ''),
                    corporateName: res.data.nome,
                    fantasyName: res.data.fantasia,
                    mainActivity: res.data.atividade_principal,
                    openingDate: newDateFormat,
                    legalNature: res.data.natureza_juridica,
                    cep: res.data.cep.replace(/\D+/g, ''),
                    publicPlace: res.data.logradouro,
                    city: res.data.municipio.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
                    state: res.data.uf
                }

                await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+res.data.uf+'/municipios').then(async (res) => {
                    await res.data.forEach(element => {
                        if (resultCompany.city === element.nome.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) {
                            resultCompany.ibgeCode = element.id
                            resultCompany.country = 'BRASIL' // O CNPJ É UNICO NO PAIS BRASIL
                            resultCompany.status = 200
                        }
                    })
                }).catch((error) => {
                    resultCompany = { 
                        status: 400,
                        message: 'Company not found!',
                        error: error
                     }
                })
            } else {
                resultCompany = {
                    status: 404,
                    message: 'Company not found!',
                    error: 'Inform a valid CNPJ to consult, register and update a company!'
                }
            }  
        }).catch((error) => {
            resultCompany = { 
               status: error.response.status,
               message: error.response.statusText,
               error: 'User sent too many requests in a given time!'
            }
        })

        return await checkQueryResult(resultCompany, typeConsult)
    }

    const checkQueryResult = async (companyDto, typeDto) => {
        if (companyDto.status === 200) {            
            const validationCompanyDTO = await Company.findOne({
                where: {
                    cnpj: companyDto.cnpj
                }
            })

            if (validationCompanyDTO != null) {
                if (typeDto === 'get') {
                    const data = {
                        status: 200,
                        message: 'Company found successfully!',
                        company: companyDto
                    }

                    return data
                } else {
                    return await updateCompany(companyDto)
                }
            } else {
                return await addCompany(companyDto)
            }
        } else {
            return companyDto
        }
    }

    const addCompany = async (companyDto) => {
        try {
            await Company.create(companyDto)

            const data = {
                status: 200,
                message: 'Company found successfully!',
                company: companyDto
            }

            return data
        } catch (error) {
            const data = {
                status: 400,
                message: 'Error adding company',
                error: error
            }
            return data
        }
    }

    const updateCompany = async (companyDto) => {
        console.log(companyDto)
        try {
            await Company.update(
                {
                    ...companyDto
                },
                { 
                    where: { 
                        cnpj: companyDto.cnpj
                    } 
                }
            )

            const data = {
                status: 200,
                message: 'Company successfully updated!',
                company: companyDto
            }

            return data
        } catch (error) {
            throw error
        }
    }

    const deleteCompany = async (cnpjDto) => {
        const validationCompanyDelete = await Company.findOne({
            where: {
                cnpj: cnpjDto
            }
        })

        if (validationCompanyDelete === null) {
            throw new Error('Company not found!')
        }

        try {
            await Company.destroy({
                where: {
                    cnpj: cnpjDto
                }
            })
        } catch (error) {
            throw error
        }
    }

    return { getCompanyByCnpjAndLocale, deleteCompany }
}

module.exports = companyService