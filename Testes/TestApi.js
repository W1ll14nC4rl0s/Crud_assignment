const assert = require('assert')
const api = require('../api')
const Chai = require('chai')
const ChaiHttp = require('chai-http')

Chai.use(ChaiHttp)

describe('Api test Suite', function(){

    it('Get Assignment', async ()=>{
        Chai.request(api)
          .get('/assignment')
          .query({customer: 'Amazon'}) 
          .end(function(err, res) {
           
            Chai.expect(err).to.be.null
            Chai.expect(res).to.have.status(200);
       
        });
        
    })

    it.only('Post Assignment', async ()=>{
        Chai.request.agent(api)
            .post('/assignment')
            .send({ name: 'Assignment', customer: 'Kawasaki' })
            .then(function (res) {
                
                Chai.expect(res).to.have.status(200);
               
              });
    })
})