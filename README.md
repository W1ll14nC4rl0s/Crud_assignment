Aplicação desenvolvida utilizando Express,Nodejs e MongoDb
O ambiente de Testes utiliza mocha e chai para realizar os testes de inclusão, alteração, consulta e delete de dados no banco
Os testes valida as rotas da API também.

necessario ter um banco de dados MongoDb rodando localmente para subir a aplicação

caso utilize mogodb no docker utilizar o comando 

docker exec -it mongodb \
    mongo --host localhost -u <user-create-Db> -p <password-user> --authenticationDatabase admin \
    --eval "db.getSiblingDB('Assignment').createUser({user: 'gestta', pwd: '12345', roles: [{role: 'readWrite', db: 'Assignment'}]})"

caso rode o mongodb direto na maquina local, criar um banco 'Assignment' e um usuario 'gestta' com senha '12345'

para rodar todos os testes utilize o comando:

npm test

para rodar os testes unitários de rotas utilize o comando:

npm run testApi

para rodar os testes do Banco de dados utilize o comando:

npm run testDb

para somente subir a aplicação 
npm start