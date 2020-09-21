const Mongoose = require('mongoose')
const Crud = require('../Strategy/Interface/InterfaceCrud')

const STATUS={
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized',
}

class MongoDb extends Crud{

    constructor(conn, schema){
        super();
        this._connect = conn;
        this._model = schema;
    }

    static  Connect(){
        
        Mongoose.connect(process.env.MONGODB_URL,
         {useUnifiedTopology: true, useNewUrlParser:true}, (error)=>{
             if(!error)return;
             console.log('Falha na conexão', error)
            }
        )

        const conn = Mongoose.connection;
        
        conn.once('open',()=> true)
       
        return conn
    }

    async isConnect(){
        const statusConn = STATUS[this._connect.readyState]

        if(STATUS[this._connect.readyState] === 'connected') return statusConn;

        if(STATUS[this._connect.readyState] !== 'connecting') return statusConn;

        await new Promise(resolve => setTimeout(resolve ,1000))

        return STATUS[this._connect.readyState] 
    }

    async create(item){
        
        return await this._model.create(item)
        
    }

    async read(query={}, skip=0, limit=0){
        
        return await this._model.find(query).skip(skip).limit(limit)
    }

    async update(id, item){
        return this._model.updateOne({_id : id}, {$set:item})
    }
    async delete(id){
        return this._model.deleteOne({_id:id})
    }
}

module.exports = MongoDb
    
