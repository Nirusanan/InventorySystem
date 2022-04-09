// const express = require('express')
// const router = express.Router();
// var sql = require("mssql");

// router.post('/login', (req, res) => {
//     let username = req.body.email;
//     let password = req.body.password;
    

//     if (username && password) {
//         sql.query("select * from [dbo].[Employe] where UserName='" + username + "' and Password='" + password + "' ").then(result => {
//             console.log(result);
           
//             if (result.recordset.length > 0 && result.recordset[0].IsAdmin === true) {
//                 res.json({ 'msg': 'Sucessfull Admin' });
//             }
//             else if (result.recordset.length > 0 && result.recordset[0].IsAdmin === false) {
//                 res.json({ 'msg': 'Sucessfull Employee' });
//             }
//             else {
//                 res.json({ 'msg': 'Incorrect' });
//             }
//             res.end();
//         }).catch(err => {
//             res.status(415).send(err);
//         })
//     }
//     else {
//         res.json({ 'msg': 'Not valid' });
//         res.end();

//     }
// });


// module.exports = router;  


const express = require('express')
const router = express.Router();
var sql = require("mssql");
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    let username = req.body.email;
    let password = req.body.password;
    console.log(password);
    

    if (username && password) {

        sql.query("select * from [dbo].[Employe] where UserName='"+username+"'").then(result => {
            console.log(result.recordset[0].Password);
            console.log(result);
            const bytes = crypto.AES.decrypt(result.recordset[0].Password, 'df32@78');
            const originalText = bytes.toString(crypto.enc.Utf8);
            console.log(originalText);
            
            // var userToken = jwt.sign({role:'employee'}, 'nirupro');
            var employeeToken = jwt.sign({role:'employee'}, 'nirupro');
            var adminToken = jwt.sign({role:'admin'}, 'nirupro');


            if (originalText === password && result.recordset[0].IsAdmin === true) {
                res.json({ 'msg': 'Sucessfull Admin', 'token': adminToken});
                // res.json({ 'msg': 'Sucessfull Admin' });
            }
            else if (originalText === password && result.recordset[0].IsAdmin === false) {
                res.json({ 'msg': 'Sucessfull Employee','token': employeeToken});
                // res.header('auth',userToken).json(userToken);
            }
            else {
                res.json({ 'msg': 'Incorrect' });
            }
            res.end();
        }).catch(err => {
            console.log("rrrr");
            res.json({ 'msg': 'Incorrect email'});
            // res.status(415).json({ 'msg': 'Incorrect email'});
        })
        
    }
    else {
        res.json({ 'msg': 'Not valid' });
        res.end();

    }
});


module.exports = router;