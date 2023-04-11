const connection = require('../Entity/connection.js')
class classManagement {
    connect;
    constructor(){
        connection.SQLConnection();
        this.connect = connection.Connecting()
    }

    findAll = () =>{
        return new Promise((resolve, reject)=>{
            this.connect.query('select * from class',(err,classes)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(classes)
                }
            })
        })
    }
}
module.exports = new classManagement()