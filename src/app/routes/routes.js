const Router = require('express').Router();
const validateQuery = require('../util/ValidateParams')
const get = require('../controllers/get')
const post = require('../controllers/postAssignment')

Router.get('/assignment', get)
Router.post('/assignment', post)

module.exports = Router