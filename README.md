# API teste FastPonto

## Install the dependencies
```bash
yarn
```
## Configure Database MySQL
```bash
- Create the database it is not necessary to create the tables
- Configure the database.js file with the database connection data
```
## Create the requisitions
```bash
- Examples:
- GET Status API: localhost:3000/
- GET Company: localhost:3000/company/27865757000102
- PATCH Company: localhost:3000/company/27865757000102
- DELETE Company: localhost:3000/company/27865757000102
```

## Possible returns
```bash
- GET Status API
    {
    	"status": 200,
    	"message": "API is online!"
    }
```

```bash
- GET Company
    {
    	"status": 200,
    	"message": "Company found successfully!",
    	"company": {
    		"cnpj": "27865757000102",
    		"corporateName": "GLOBO COMUNICACAO E PARTICIPACOES S/A",
    		"fantasyName": "TV/REDE/CANAIS/G2C+GLOBO GLOBO.COM GLOBOPLAY",
    		"mainActivity": [
    			{
    				"text": "Atividades de televisão aberta",
    				"code": "60.21-7-00"
    			}
    		],
    		"openingDate": "1986-01-31T03:00:00.000Z",
    		"legalNature": "205-4 - Sociedade Anônima Fechada",
    		"cep": "22460901",
    		"publicPlace": "R LOPES QUINTAS",
    		"city": "RIO DE JANEIRO",
    		"state": "RJ",
    		"ibgeCode": "3304557",
    		"country": "BRASIL",
    		"status": 200
    	}
    },
    
    {
    	"status": 404,
    	"message": "Company not found!",
    	"error": "Inform a valid CNPJ to consult, register and update a company!"
    }
```

```bash
- PATCH Company
    {
    	"status": 200,
    	"message": "Company successfully updated!",
    	"company": {
    		"cnpj": "27865757000102",
    		"corporateName": "GLOBO COMUNICACAO E PARTICIPACOES S/A",
    		"fantasyName": "TV/REDE/CANAIS/G2C+GLOBO GLOBO.COM GLOBOPLAY",
    		"mainActivity": [
    			{
    				"text": "Atividades de televisão aberta",
    				"code": "60.21-7-00"
    			}
    		],
    		"openingDate": "1986-01-31T03:00:00.000Z",
    		"legalNature": "205-4 - Sociedade Anônima Fechada",
    		"cep": "22460901",
    		"publicPlace": "R LOPES QUINTAS",
    		"city": "RIO DE JANEIRO",
    		"state": "RJ",
    		"ibgeCode": "3304557",
    		"country": "BRASIL",
    		"status": 200
    	}
    },
    
    {
    	"status": 404,
    	"message": "Company not found!",
    	"error": "Inform a valid CNPJ to consult, register and update a company!"
    }
```

```bash
- DELETE Company
    204 No Content,

    {
    	"status": 404,
    	"message": "Company not found!"
    }
```