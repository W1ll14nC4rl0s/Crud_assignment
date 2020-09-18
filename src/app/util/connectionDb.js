const MongoDb = require('../../Db/MongoDb/MongoDb') 
const schema = require('../../Db/MongoDb/Schema/schemaTarefa')
const Context = require('../../Db/Strategy/Base/ContextStrategy')

class ConnectionDb{

    static connect(){
        const conn = MongoDb.Connect()
        const Mongo = new Context(new MongoDb(conn, schema))

        return Mongo

    }
   

}

module.exports = ConnectionDb