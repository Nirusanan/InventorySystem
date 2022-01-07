const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const port = 4000

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
    password: '1234',
    server: 'localhost',
    database: 'InventorySystem',
    trustServerCertificate: true
};

app.get('/view', (req, res) => {
    
    sql.connect(config, function (err) {

        if (err) console.log(err);

        else {
            console.log("sucessfully DB connected!");
            sql.query("select*from [dbo].[Employe]").then(result => {
                console.log(result);
                res.status(200).send(result.recordset);
            }).catch(err => {
                res.status(415).send(err);
            })

        }

    });


});

app.post('/insert', (req, res) => {
    let username = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let address = req.body.address;
    let mobile = req.body.mobile;
    let age = req.body.age;
    let admin = req.body.admin;
    let createOn = req.body.createdOn;

    

    console.log(username);

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        else {
            console.log("sucessfully DB connected!");
            sql.query("insert into  [dbo].[Employe] values('"+username+"','"+password+"','"+name+"','"+address+"','"+mobile+"','"+age+"','"+admin+"','"+createOn+"')").then(result => {
                res.status(200).send(result);
            }).catch(err => {
                res.status(415).send(err);
            })

        }

    });


});

app.post('/update', (req, res) => {
    
    let id = req.body.id;
    let username = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let address = req.body.address;
    let mobile = req.body.mobile;
    let age = req.body.age;
    let admin = req.body.admin;
    let createOn = req.body.createdOn;

    console.log(id);
    sql.connect(config, function (err) {

        if (err) console.log(err);

        else {
            console.log("sucessfully DB connected!");
            sql.query("update [dbo].[Employe] set UserName='"+username+"', Password='"+password+"', Name='"+name+"',Address='"+address+"',Mobile='"+mobile+"',Age='"+age+"',IsAdmin='"+admin+"',CreatedOn='"+createOn+"' where Id="+id).then(result => {
                console.log(result);
                res.status(200).send(result.recordset);
            }).catch(err => {
                res.status(415).send(err);
            })

        }

    });


});

app.post('/delete', (req, res) => {
    
    let id = req.body.id;
    console.log(id);
    sql.connect(config, function (err) {

        if (err) console.log(err);

        else {
            console.log("sucessfully DB connected!");
            sql.query("delete from [dbo].[Employe] where Id="+id).then(result => {
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