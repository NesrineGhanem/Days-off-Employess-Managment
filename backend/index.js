const express = require("express");
const {json} = require("express");
const connectBD = require("./config/database");
const userRouter = require('./routes/userRouter');
const daysoffRouter= require('./routes/dayOffRouter');
//var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const  swaggerDocument = require ('./swag.json'); 
const cors = require('cors');

const app= express();
connectBD()

//cors policy
// app.use(cors({
//     origin: "http://localhost:3000"
// }));
app.use(express.json({limit:'99999mb'}))
app.use(express.urlencoded({limit:'99999mb',extended:true}))
app.use(cors())

//app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api-swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(userRouter);
app.use(daysoffRouter);

//create new port
const port = process.env.PORT || 5000
 app.listen(port,()=>{
     console.log(`server is running on http://localhost:${port}`)
})

