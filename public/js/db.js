const util = require("util");
const mysql = require("mysql2");
const { DATABASE,USER,HOST,PASSWORD,PORT } = process.env;

const mysqlConfig = {
    host: process.env.HOST,
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    multipleStatements: true
}

const db = mysql.createPool(mysqlConfig)
db.query = util.promisify(db.query);

module.exports = db;