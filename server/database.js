var mysql      = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({  
    host     : process.env.DB_HOST || 'localhost',  
    user     : process.env.DB_USERNAME || 'root',  
    password : process.env.DB_PASSWORD || '',
    database : process.env.DB_DATABASE || 'proyecto_pedidos'
});

module.exports = connection;