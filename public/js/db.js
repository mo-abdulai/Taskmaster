const util = require("util");
const mysql = require("mysql2");
const { DATABASE,USER,HOST,PASSWORD,PORT } = process.env;

const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: '1122',
    database: 'taskmaster',
    port: 3306,
    multipleStatements: true
}

const db = mysql.createPool(mysqlConfig)
// const db = mysql.createPool(mysqlConfig)
// connectionPool.query = util.promisify(connectionPool.query);

// db.connect((error) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log("MySQL connected!")
//     }
// })

db.query = util.promisify(db.query);

module.exports = db;