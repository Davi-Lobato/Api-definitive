const mysql = require('mysql12');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'root',
    database: 'api_contato_bd',
});

module.exports = connection;