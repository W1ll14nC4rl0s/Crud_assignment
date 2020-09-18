const assert = require('assert')
const Context = require('../src/Db/Strategy/Base/ContextStrategy')

const MongoDb = require('../src/Db/MongoDb/MongoDb') 
const schema = require('../src/Db/MongoDb/Schema/schemaTarefa')

let DbMongo = {}

const options = { year : "numeric", month: "numeric", day: "numeric"}


const Assignment = {
    name: 'Document',
    customer: 'Apple',
    due_date: new Date(),
    legal_date: new Date(),
    fine: true,
    documents: [1,2,3]
}

const AssignmentUpdate = {
    ...Assignment,
    name: 'Contract',
    customer: 'Amazon',
  
}

describe('Bd test suite', function(){
    this.beforeAll(async()=>{
        
        const Conn  =  MongoDb.Connect()
        
        DbMongo = new Context( new MongoDb(Conn, schema))
        
    })


    it('Connection Db MongoDb', async ()=>{
        const result = await DbMongo.isConnect()
        
        assert.deepStrictEqual(result, 'connected')
    })


    it('Insert data in MongoDb', async()=>{
        
        const result = await DbMongo.create(Assignment)
       
        assert(result)
       
    })

    it('Get data in MongoDb', async () =>{
        const [ result ] = await DbMongo.read({name: Assignment.name})
       
        assert(result)
    })


    it('Update data in MongoDb', async () =>{
        const [{ _id }] = await DbMongo.read({name: Assignment.name})

        const { nModified } = await DbMongo.update(_id, AssignmentUpdate)
        assert.deepStrictEqual(nModified, 1)
    })

    it('Delete data in MongoDb', async () =>{
        const [{ _id }] = await DbMongo.read({name: AssignmentUpdate.name})

        const { deletedCount } = await DbMongo.delete(_id)
        assert.deepStrictEqual(deletedCount, 1)
    })
})