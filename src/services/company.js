const axios = require('axios').default

class CompanyService {
    constructor(CompanyModel) {
        this.company = CompanyModel
    }

    async getCompanyByCnpj(cnpjDto){
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
                    ibgeCode: '12212112',
                    city: res.data.municipio,
                    state: res.data.uf,
                    country: 'PAIS'
                }
            } else {
                resultCompany = res.data
            }
        })

        if (resultCompany.status !== 'ERROR') {
            const validationCompanyDTO = await this.company.findOne({
                where: {
                    cnpj: resultCompany.cnpj.replace(/\D+/g, '')
                }
            })
    
            if (validationCompanyDTO != null) {
                console.log('entrou 1')
                return resultCompany
            } else {
                console.log('entrou 2')
                this.addCompany(resultCompany)
                return resultCompany
            }
        } else {
            return resultCompany
        }
    }

    async addCompany(companyDto) {
        try {
            await this.company.create(companyDto)
        } catch (error) {
            throw error
        }
    }
}

module.exports = CompanyService