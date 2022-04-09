var sql = require("mssql");

// config for your database
var config = {
    user: 'niru',
    password: 'niru97',
    server: 'localhost',
    database: 'InventorySystem',
    trustServerCertificate: true
};

var conn = sql.connect(config, function (err) {
    if (err) console.log(err);

    else {
        console.log("sucessfully DB connected!");
    }

});


console.log(conn.connect());