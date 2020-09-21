Aplicação desenvolvida utilizando Express,Nodejs e MongoDb
O ambiente de Testes utiliza mocha e chai para realizar os testes de inclusão, alteração, consulta e delete de dados no banco
Os testes valida as rotas da API também.

para subir a aplicação utilize o comando :
docker-compose up

e a aplicação será carregada devidamente con todas suas dependecias

para rodar todos os testes utilize os comando:

npm test

para rodar os testes unitários de rotas utilize o comando:

npm run testApi

para rodar os testes do Banco de dados utilize o comando:

npm run testDb

para somente subir a aplicação 
npm start