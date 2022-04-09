const express = require('express')
const router = express.Router();
var sql = require("mssql");

router.get('/forecastView', (req, res) => {

    let id = req.body.pid;

    sql.query("select NextMonthPrediction,CreatedOn from [dbo].[Prediction] where ProductId="+id).then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })

});

router.post('/forecastProduct', (req, res) => {

    let productName = req.body.pname;

    sql.query("select Id from [dbo].[Product] where Description='"+productName+"'").then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })

});

module.exports = router;