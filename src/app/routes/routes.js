const Router = require('express').Router();
const validateQuery = require('../util/ValidateParams')
const get = require('../controllers/get')
const post = require('../controllers/postAssignment')

/* 
    @swagger
    /assignment:
    get:
        description: Busca informações de tarefas no banco de dados
        responses:
        '200':
*/

Router.get('/assignment', get)
Router.post('/assignment', post)

module.exports = Router