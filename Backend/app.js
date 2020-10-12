const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const userRoutes=require('./Routes/userRoutes');

const app=express();

mongoose.connect('mongodb://localhost:27017/fullstackPractice',{useNewUrlParser:true})
.then(() => {
  console.log('Connection Successful')
})
.catch(() => {
  console.log('Connection Failed');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});

app.use(userRoutes);

app.listen(3000);
