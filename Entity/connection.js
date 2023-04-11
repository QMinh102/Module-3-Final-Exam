const mysql = require('mysql');

class Connection {
    MySQLConfig = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'student_monitor'
    }
    Connecting = () => {
        return mysql.createConnection(this.MySQLConfig);
    }

    SQLConnection = () => {
        this.Connecting().connect((error) => {
            if (error) {
                console.log(error, 'Connection unsuccessful');
            } else {
                console.log('Connection to the Database is successful');
            }
        })
    }
}

module.exports = new Connection();