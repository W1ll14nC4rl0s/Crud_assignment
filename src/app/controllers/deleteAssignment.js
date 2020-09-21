const Boom = require('boom')
const validateQuery = require('../util/ValidateParams')
const DbConnection = require('../util/connectionDb')

module.exports = async (req, res)=>{
    const { error, value } = validateQuery.schemaValidateQuery.validate(req.query, { abortEarly: false})

    if(error){
        res.send(
            {
                statusCode: 400,
                message: error.details
            }
        ) 
    }else{
        try {
            const Mongo = await DbConnection.connect()
            
            const result = await Mongo.delete(value)

            res.send(
                {
                    statusCode: 200,
                    message: result
                }
            )

        } catch (error) {
            console.log('ERROR REQUEST DELET ', error.stack)
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