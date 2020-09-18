const Boom = require('boom')
const validateQuery = require('../util/ValidateParams')
const DbConnection = require('../util/connectionDb')

module.exports = async (req, res)=>{
  
    const { error, value } = validateQuery.schemaValidate.validate(req.query, { abortEarly: false})

    if(error) {
        res.send(
            {
                statusCode: 400,
                message: Boom.badRequest()
            }
        ) 
    }else{
        try {
            const Mongo = await DbConnection.connect()
            const result = await Mongo.read(value)
            res.send(
                {
                    statusCode: 200,
                    message: result
                }
            )
        }catch(error) {
            console.log(error.stack)
            res.send(
                {
                    statusCode: 500,
                    message: Boom.internal()
                }
            )
            
        }
    }
}