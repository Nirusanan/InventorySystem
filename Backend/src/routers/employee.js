// const express = require('express')
// const router = express.Router();
// var sql = require("mssql");

// router.get('/view', (req, res) => {

//     sql.query("select*from [dbo].[Employe]").then(result => {
//         console.log(result);
//         res.status(200).send(result.recordset);
//     }).catch(err => {
//         res.status(415).send(err);
//     })
// });


// router.post('/insert', (req, res) => {
//     let username = req.body.email;
//     let password = req.body.password;
//     let name = req.body.name;
//     let address = req.body.address;
//     let mobile = req.body.mobile;
//     let age = req.body.age;
//     let admin = req.body.admin;
//     let createOn = req.body.createdOn; 

//     sql.query("insert into  [dbo].[Employe] values('"+username+"','"+password+"','"+name+"','"+address+"','"+mobile+"','"+age+"','"+admin+"','"+createOn+"')").then(result => {
//         res.status(200).send(result);
//     }).catch(err => {
//         res.status(415).send(err);
//     })
// });


// router.post('/update', (req, res) => {
//     let id = req.body.id;
//     let username = req.body.email;
//     let password = req.body.password;
//     let name = req.body.name;
//     let address = req.body.address;
//     let mobile = req.body.mobile;
//     let age = req.body.age;
//     let admin = req.body.admin;
//     let createOn = req.body.createdOn;

//     sql.query("update [dbo].[Employe] set UserName='" + username + "', Password='" + password + "', Name='" + name + "',Address='" + address + "',Mobile='" + mobile + "',Age='" + age + "',IsAdmin='" + admin + "',CreatedOn='" + createOn + "' where Id=" + id).then(result => {
//         console.log(result);
//         res.status(200).send(result.recordset);
//     }).catch(err => {
//         res.status(415).send(err);
//     })
// });


// router.post('/delete', (req, res) => {

//     let id = req.body.id;

//     sql.query("delete from [dbo].[Employe] where Id=" + id).then(result => {
//         console.log(result);
//         res.status(200).send(result.recordset);
//     }).catch(err => {
//         res.status(415).send(err);
//     })
// });

// module.exports = router;  


const express = require('express')
const router = express.Router();
var sql = require("mssql");
const crypto = require('crypto-js');

router.get('/view', (req, res) => {

    sql.query("select*from [dbo].[Employe]").then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })
});


router.post('/insert', (req, res) => {
    let username = req.body.email;
    let password = crypto.AES.encrypt(req.body.password, 'df32@78').toString(); 
    let name = req.body.name;
    let address = req.body.address;
    let mobile = req.body.mobile;
    let age = req.body.age;
    let admin = req.body.admin;
    let createOn = req.body.createdOn; 

    console.log(password);

    sql.query(" SET ANSI_WARNINGS OFF; insert into  [dbo].[Employe] values('"+username+"','"+password+"','"+name+"','"+address+"','"+mobile+"','"+age+"','"+admin+"','"+createOn+"')")
    .then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(415).send(err);
    })
});


router.post('/update', (req, res) => {

    let id = req.body.id;
    let username = req.body.email;
    let password = crypto.AES.encrypt(req.body.password, 'df32@78').toString();
    let name = req.body.name;
    let address = req.body.address;
    let mobile = req.body.mobile;
    let age = req.body.age;
    // let admin = req.body.admin;
    // let createOn = req.body.createdOn;

    sql.query(" SET ANSI_WARNINGS OFF; update [dbo].[Employe] set UserName='" + username + "', Password='" + password + "', Name='" + name + "',Address='" + address + "',Mobile='" + mobile + "',Age='" + age + "' where Id=" + id).then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })
});


router.post('/delete', (req, res) => {

    let id = req.body.id;

    sql.query("delete from [dbo].[Employe] where Id=" + id).then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })
});

router.post('/profile', (req, res) => {

    let username = req.body.email;

    sql.query("select Name,Address,Mobile from [dbo].[Employe] where UserName='" + username + "'").then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })
});


module.exports = router;