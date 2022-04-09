const express = require('express')
// var bodyParser = require('body-parser');
// const app = express()
const router = express.Router();
var sql = require("mssql");


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });




router.get('/customerView', (req, res) => {

    sql.query("select * from [dbo].[Customer]").then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })

});

router.post('/customerInsert', (req, res) => {
    let name = req.body.name;
    let address = req.body.address;
    let mobile = req.body.mobile;
    let createOn = req.body.createdOn;
    let segment = req.body.segment;    

    

    console.log(name);

    sql.query("insert into  [dbo].[Customer] values('"+name+"','"+address+"','"+mobile+"','"+createOn+"','"+segment+"')").then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(415).send(err);
    })

});


router.post('/customerUpdate', (req, res) => {
    
    let id = req.body.id;
    let name = req.body.name;
    let address = req.body.address;
    let mobile = req.body.mobile;
    let createOn = req.body.createdOn;
    
    console.log(id);

    sql.query("update [dbo].[Customer] set Name='"+name+"',City='"+address+"',MobileNumber='"+mobile+"',CreatedOn='"+createOn+"' where Id="+id).then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })

});


router.post('/customerDelete', (req, res) => {
    
    let id = req.body.id;
    console.log(id);
    sql.query("delete from [dbo].[Customer] where Id="+id).then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })
});

module.exports = router;