const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const userRoutes=require('./Routes/userRoutes');
const recipeRoutes=require('./Routes/recipeRoutes');
const ingRoutes=require('./Routes/ingredientRoutes');

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
app.use('/images',express.static(path.join('Backend/images')));

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});

app.use(userRoutes);
app.use(recipeRoutes);
app.use(ingRoutes);

app.listen(3000);
