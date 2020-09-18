const Boom = require('boom')
const ValidPayload = require('../util/validatePayload')
const DbConnection = require('../util/connectionDb')

module.exports = async (req, res)=>{
    
    const { error, value } = ValidPayload.validate(req.body, { abortEarly: true})

    if(error){
    
        res.send(
            {
                statusCode: 400,
                message: Boom.internal()
            }
        ) 
    }

    try {
        
        let assignment = value

        const aux = JSON.stringify(assignment)

        assignment = JSON.parse(aux)
        const Mongo = await DbConnection.connect()
        const result = await Mongo.create(assignment)
       
        res.send({
            statusCode: 200,
            message: result
        })

    } catch (error) {
        console.log('ERROR REQUEST POST ', error.stack)

      res.send(  {
        statusCode: 500,
        message: Boom.internal()
        })
    }

}