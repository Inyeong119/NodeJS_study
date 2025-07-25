const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
require('dotenv').config();
const MONGO_DB_PROD = process.env.MONGO_DB_PROD;
console.log("MONGO_DB_PROD",MONGO_DB_PROD);
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api",indexRouter);

const mongoURI = MONGO_DB_PROD;

mongoose.connect(mongoURI,{useNewURLParser:true}).then(()=>{
  console.log("mongoose connected");
})
  .catch((error)=>{
    console.log("DB Connection fail",err);
  });

app.listen(process.env.PORT || 5000,()=>{
  console.log("server on 5000");
})