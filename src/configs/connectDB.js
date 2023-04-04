// get the client
// const mysql = require('mysql2');
import mysql from 'mysql2/promise'

console.log("Creating connection pool...")
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs_express',
    // password: 'password'
})

// create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'nodejs_express'
// });
// const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test', Promise: bluebird});
   

export default pool;