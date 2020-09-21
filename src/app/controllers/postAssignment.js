const Boom = require('boom')
const ValidPayload = require('../util/validatePayload')
const DbConnection = require('../util/connectionDb')

module.exports = async (req, res)=>{
    
    const { error, value } = ValidPayload.validBody.validate(req.body, { abortEarly: true})

    if(error){
        
        res.send({
            statusCode: 400,
            message: error.details
        })

    }else{
        try {

            let assignment = value
            
            if(assignment.legal_date > assignment.due_date) assignment.fine = true
    
            const Mongo = await DbConnection.connect()
            const result = await Mongo.create(assignment)
           
            res.send({
                statusCode: 200,
                message: result
            })
    
        } catch (error) {
            console.log('ERROR REQUEST POST ', error.stack)
            
            res.send({
                statusCode: 500,
                message: error.stack
            })

        }
    }

}