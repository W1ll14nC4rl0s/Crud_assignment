const Boom = require('boom')
const validQuery = require('../util/ValidateParams')
const DbConnection = require('../util/connectionDb')

module.exports = async (req, res)=>{

    const {error, value} = validQuery.schemaValidateDeleteDocuments.validate(req.query, { abortEarly: false})

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

            const resultMongo = await Mongo.read({_id: value._id})
            let document = resultMongo.map(dado => dado.documents)
            const aux = document[0]
            document = aux
            document.splice(document.indexOf(value.document), 1);
            
            const result = await Mongo.update(value._id, {documents: document})
        } catch (error) {
            console.log('ERROR REQUEST PATCH DOCUMENT ', error.stack)
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