const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const Router = require('./src/app/routes/routes')

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: 'application/json' }));
    
    app.use(Router)
    app.listen(4000, () => {
        console.log('Servidor rodando na porta 4000...')
    });

process.on('unhandledRejeiction', (error)=>{
    console.log('Error', error)
    process.exit(1)
})

module.exports = app