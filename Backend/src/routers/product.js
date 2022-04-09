const express = require('express')
const router = express.Router();
var sql = require("mssql");


router.get('/productView', (req, res) => {

    sql.query("select * from [dbo].[Product]").then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })
    
});


router.post('/productInsert', (req, res) => {
    let name = req.body.name;
    let price = req.body.price; 

    console.log(name);

    sql.query("insert into  [dbo].[Product] values('"+name+"','"+price+"')").then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(415).send(err);
    })

});


router.post('/productUpdate', (req, res) => {
    
    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;
   
    sql.query("update [dbo].[Product] set Description='"+name+"',UnitPrice='"+price+"' where Id="+id).then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })

});


router.post('/productDelete', (req, res) => {
    
    let id = req.body.id;

    sql.query("delete from [dbo].[Product] where Id="+id).then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })

});

module.exports = router;