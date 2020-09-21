const Router = require('express').Router();
const validateQuery = require('../util/ValidateParams')
const get = require('../controllers/get')
const post = require('../controllers/postAssignment')
const patch = require('../controllers/patchAssignment')
const del = require('../controllers/deleteAssignment')
const delDocument = require('../controllers/deleteDocument')

/*
*paths:
*   /assignment:
*/


/**
*    @swagger
*    /assignment:
*    get:
*        summary: Task list
*        parameters:
*           - in: query
*             name: name
*             schema:
*               type: string
*             description: filter by name
*           - in: query
*             name: customer
*             schema:
*               type: string
*             description: filter by customer
*           - in: query
*             name: due_date
*             schema:
*               type: date
*             description: filter by due date
*           - in: query
*             name: legal_date
*             schema:
*               type: date
*             description: filter by legal date
*           - in: query
*             name: fine
*             schema:
*               type: boolean
*             description: filter by fine
*        responses:
*           200:
*               description: A successful response
*               schema:
*               type: object
*  
*           400:
*               description: Bad request. User ID must be an integer and bigger than 0.
*               schema:
*               type: object
*    post:
*       summary: Add new Assignment
*       consumes:
*           - application/json
*       parameters:
*           - in: body
*             name: assignment
*             schema: 
*               $ref: '#/definitions/assignment'
*       responses:
*           200:
*               description: A successful add task
*               schema:
*                 type: object
*           400:
*               description: Bad request. User ID must be an integer and bigger than 0.
*               schema:
*               type: object
*    patch:
*       summary: include documents in a task
*       parameters:
*          - in: query
*            name: _id
*            schema:
*              type: string
*            description: task id
*          - in: body
*            name: document
*            schema:
*              type: object
*              properties:
*                  document:
*                       type: string
*       responses:
*           200:
*               description: A successful add task
*               schema:
*                 type: object
*           400:
*               description: Bad request. User ID must be an integer and bigger than 0.
*               schema:
*               type: object
*    delete:
*       summary: delete Assignment by id
*       parameters:
*           - in: query
*             name: _id
*             schema:
*               type: string
*             description: search for id
*       responses:
*           200:
*               description: A successful add task
*               schema:
*                 type: object
*           400:
*               description: Bad request. User ID must be an integer and bigger than 0.
*               schema:
*               type: object
*paths:
*  /assignment/document:
*   patch:
*       summary: delete document in a task
*       parameters:
*          - in: query
*            name: _id
*            schema:
*              type: string
*            description: task id
*          - in: query
*            name: document
*            schema:
*              type: string
*       responses:
*           200:
*               description: A successful add task
*               schema:
*                 type: object
*           400:
*               description: Bad request. User ID must be an integer and bigger than 0.
*               schema:
*               type: object
*definitions:
*   assignment:
*       type: object
*       required:
*           - name
*           - customer
*           - due_date
*           - legal_date
*       properties:
*           name:
*               type: string
*           customer:
*               type: string
*           due_date:
*               type: string
*           legal_date:
*               type: string
*/

Router.get('/assignment', get)
Router.post('/assignment', post)
Router.patch('/assignment', patch)
Router.delete('/assignment', del)
Router.patch('/assignment/document',delDocument)

module.exports = Router