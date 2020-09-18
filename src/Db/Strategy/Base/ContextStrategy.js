const Crud = require('../Interface/InterfaceCrud')

class ContextStrategy extends Crud{
    constructor(db){
        super();
        this._dataBase = db;
    }

    static Connect(){
        return this._dataBase.Connect();
    }

    isConnect(){
        return this._dataBase.isConnect();
    }

    create(item){
        return this._dataBase.create(item)
    }

    read(query, limite, skip){
        return this._dataBase.read(query, limite, skip)
    }
    update(query, item){
        return this._dataBase.update(query, item)
    }

    delete(id){
        return this._dataBase.delete(id)
    }
}

module.exports = ContextStrategy