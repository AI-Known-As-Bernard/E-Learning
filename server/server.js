import express from 'express';
import cors from 'cors';
const morgan = require('morgan');
require("dotenv").config()

//create express app
const app = express()


//apply middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use((req, res, next) =>{
    console.log('middleware testing')
    next();
})


//routes
app.get('/',(req,res) => {
    res.send("server endpoint")
})

//port
const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {console.log(`Listening on http://localhost:${PORT}/`)})