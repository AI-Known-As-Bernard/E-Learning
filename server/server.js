import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
const morgan = require('morgan');
require("dotenv").config()
import router from './routes/auth'

//create express app
const app = express()

//database-connect
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));
  
//apply middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use('/api',router)

//port
const PORT = process.env.PORT || 5000;


app.listen(PORT,() => {console.log(`Listening on http://localhost:${PORT}/`)})