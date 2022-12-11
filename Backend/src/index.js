const express = require('express');
// const cors = require('cors');
var bodyParser = require('body-parser');
require('./db/db_connector');
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const employeeRouter = require('./routers/employee');
const customerRouter = require('./routers/customer');
const productRouter = require('./routers/product');
const invoiceRouter = require('./routers/invoice');
const loginRouter = require('./routers/login');
const segmentRouter = require('./routers/segment');
const forecastRouter = require('./routers/forecast');




// app.use(cors());
// app.use(express.json()); 

app.use(employeeRouter);
app.use(customerRouter);
app.use(productRouter);
app.use(invoiceRouter);
app.use(loginRouter);
app.use(segmentRouter);
app.use(forecastRouter);




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})