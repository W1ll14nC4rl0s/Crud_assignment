const Boom = require('boom')
const validQuery = require('../util/ValidateParams')
const validBody = require('../util/validatePayload')
const DbConnection = require('../util/connectionDb')

module.exports = async (req, res)=>{
    
    const valid = validQuery.schemaValidateQuery.validate(req.query, { abortEarly: true})
    const { error, value } = validBody.validDocument.validate(req.body, { abortEarly: true})

    if( error || valid.error){
        res.send(
            {
                statusCode: 400,
                message: error || valid.error
            }
        ) 
    }else{
        try {   

            const Mongo = await DbConnection.connect()

            const resultMongo = await Mongo.read(valid.value)
            let document = resultMongo.map(dado => {
                if(Object.keys(dado.documents).length != 0){
                    return dado.documents
                }
            } )
            const aux = document[0]
            if(aux == undefined){
                document.push(value.document)
            }else{
                document = aux
                document.push(value.document)
            }
           
            const filteredDocument = document.filter(dado => { return dado !== undefined})

            const result = await Mongo.update(valid.value._id, {documents: filteredDocument})
            //list.splice(list.indexOf('foo'), 1);
            res.send(
                {
                    statusCode: 200,
                    message: 'OK'
                }
            ) 
        } catch (error) {
            console.log('ERROR REQUEST PATCH ', error.stack)
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