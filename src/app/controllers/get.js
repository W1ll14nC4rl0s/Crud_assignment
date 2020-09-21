const Boom = require('boom')
const validateQuery = require('../util/ValidateParams')
const DbConnection = require('../util/connectionDb')

module.exports = async (req, res)=>{
  
    const { error, value } = validateQuery.schemaValidate.validate(req.query, { abortEarly: false})

    if(error) {
        res.send(
            {
                statusCode: 400,
                message: error.details
            }
        ) 
    }else{
        try {
            
            const Mongo = await DbConnection.connect()
            
            const resultMongo = await Mongo.read(value)
            
            const result = resultMongo.map((dado)=>{
                
                if(dado.legal_date > dado.due_date){
                    obj = {
                        id: dado._id,
                        name: dado.name,
                        customer: dado.customer,
                        due_date: dado.due_date,
                        legal_date: dado.legal_date,
                        fine: dado.fine,
                        status:'FINE',
                        documents: Object.keys(value).length ? dado.documents : undefined 
                    }
                }else if(dado.due_date > new Date()){
                    obj = {
                        id: dado._id,
                        name: dado.name,
                        customer: dado.customer,
                        due_date: dado.due_date,
                        legal_date: dado.legal_date,
                        fine: dado.fine,
                        status:'OVERDUE',
                        documents: Object.keys(value).length ? dado.documents : undefined 
                    }
                }else{
                    obj = {
                        id: dado._id,
                        name: dado.name,
                        customer: dado.customer,
                        due_date: dado.due_date,
                        legal_date: dado.legal_date,
                        fine: dado.fine,
                        status:'OK',
                        documents: Object.keys(value).length ? dado.documents : undefined 
                    }
                }
                const aux = JSON.stringify(obj)
                obj = JSON.parse(aux) 
                return obj
            })

            res.send(
                {
                    statusCode: 200,
                    message: result
                }
            )
        }catch(error) {
            console.log('ERROR REQUEST GET ', error.stack)
            res.send(
                {
                    statusCode: 500,
                    message: Boom.internal(),
                    description: error.stack
                }
            )
            
        }
    }
}