const express = require('express')
const router = express.Router();
var sql = require("mssql");

router.get('/segmentView', (req, res) => {

    sql.query("select Id,Name,Segment from [dbo].[Customer]").then(result => {
        console.log(result);
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(415).send(err);
    })

});

module.exports = router;