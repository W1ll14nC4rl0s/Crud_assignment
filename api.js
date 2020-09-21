const express = require('express')
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const app = express();
const Router = require('./src/app/routes/routes');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:"API",
            description:"Customer API information",
            constact:{
                name: "Developer System"
            },
            servers:['http://localhost:4000']
        }
    },
    apis:["./src/app/routes/routes.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: 'application/json' }));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    app.use(Router)
    app.listen(4000, () => {
        console.log('Servidor rodando na porta 4000...')
    });

process.on('unhandledRejeiction', (error)=>{
    console.log('Error', error)
    process.exit(1)
})

module.exports = app