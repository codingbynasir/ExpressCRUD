var mysql=require('mysql');
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});
module.exports={conn:dbConn};