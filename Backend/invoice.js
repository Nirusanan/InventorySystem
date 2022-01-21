const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const port = 4004

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



app.post('/customerName', (req, res) => {
    let mobileNumber = req.body.mobile;
    
    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        else {
            console.log("sucessfully DB connected!");

            sql.query("select Id,Name from [dbo].[Customer] where MobileNumber='"+mobileNumber+"' ").then(result => {
                console.log(result);
                res.status(200).send(result.recordset);
            }).catch(err => {
                res.status(415).send(err);
            })

        }

    });

});


app.post('/productName', (req, res) => {
    let productName = req.body.productName;
    
    console.log(productName);

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        else {
            console.log("sucessfully DB connected!");

            sql.query("select Id,UnitPrice from [dbo].[Product] where Description='"+productName+"' ").then(result => {
                console.log(result);
                res.status(200).send(result.recordset);
            }).catch(err => {
                res.status(415).send(err);
            })            

        }

    });


});




app.post('/invoiceInsert', (req, res) => {
    let productId = req.body.productId;
    let customerId = req.body.customerId;
    let quantity = req.body.quantity;
    let price = req.body.price;
    let date = req.body.date;
    let employeeId = req.body.employeeId;
        
    console.log(productId);

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        else {
            console.log("sucessfully DB connected!");

            sql.query("insert into  [dbo].[Invoice] values('"+productId+"','"+customerId+"','"+quantity+"','"+price+"','"+date+"','"+employeeId+"')").then(result => {
                console.log(result);
                res.status(200).send(result);
            }).catch(err => {
                res.status(415).send(err);
            })

        }

    });


});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})