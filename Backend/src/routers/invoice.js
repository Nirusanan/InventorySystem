const express = require('express')
const router = express.Router();
var sql = require("mssql");




router.post('/customerName', (req, res) => {
    let mobileNumber = req.body.mobile;

    sql.query("select Id,Name,Segment from [dbo].[Customer] where MobileNumber='"+mobileNumber+"' ").then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })
    

});


router.post('/productName', (req, res) => {
    let productName = req.body.productName;
    
    console.log(productName);

    sql.query("select Id,UnitPrice from [dbo].[Product] where Description='"+productName+"' ").then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })

});




router.post('/invoiceInsert', (req, res) => {
    let productId = req.body.productId;
    let customerId = req.body.customerId;
    let quantity = req.body.quantity;
    let price = req.body.price;
    let date = req.body.date;
    
    console.log(productId);
    console.log(date);

    sql.query("insert into  [dbo].[Invoice] values('"+productId+"','"+customerId+"','"+quantity+"','"+price+"','"+date+"')").then(result => {
        console.log(result);
        res.status(200).send(result);
    }).catch(err => {
        res.status(415).send(err);
    })

});

module.exports = router;