const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const port = 4003

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var sql = require("mssql");

// config for your database
var config = {
    user: 'niru',
    password: 'niru123',
    server: 'localhost',
    database: 'InventorySystem',
    trustServerCertificate: true
};

app.get('/productView', (req, res) => {
    
    sql.connect(config, function (err) {

        if (err) console.log(err);

        else {
            console.log("sucessfully DB connected!");
            sql.query("select * from [dbo].[Product]").then(result => {
                console.log(result);
                res.status(200).send(result.recordset);
            }).catch(err => {
                res.status(415).send(err);
            })

        }

    });


});

app.post('/productInsert', (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
     

    

    console.log(name);

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        else {
            console.log("sucessfully DB connected!");
            sql.query("insert into  [dbo].[Product] values('"+name+"','"+price+"')").then(result => {
                res.status(200).send(result);
            }).catch(err => {
                res.status(415).send(err);
            })

        }

    });


});

app.post('/productUpdate', (req, res) => {
    
    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;
   
    

    console.log(id);
    sql.connect(config, function (err) {

        if (err) console.log(err);

        else {
            console.log("sucessfully DB connected!");
            sql.query("update [dbo].[Product] set Description='"+name+"',UnitPrice='"+price+"' where Id="+id).then(result => {
                console.log(result);
                res.status(200).send(result.recordset);
            }).catch(err => {
                res.status(415).send(err);
            })

        }

    });


});

app.post('/productDelete', (req, res) => {
    
    let id = req.body.id;
    console.log(id);
    sql.connect(config, function (err) {

        if (err) console.log(err);

        else {
            console.log("sucessfully DB connected!");
            sql.query("delete from [dbo].[Product] where Id="+id).then(result => {
                console.log(result);
                res.status(200).send(result.recordset);
            }).catch(err => {
                res.status(415).send(err);
            })

        }

    });


});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})