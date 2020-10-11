var express = require('express');

var mongoose = require('mongoose');
var bodyParser= require('body-parser');

var app=express();

mongoose.connect('mongodb://localhost:27017/fullstackPractice',{useNewUrlParser:true})
.then(() => {
  console.log('Connection Successful')
})
.catch(() => {
  console.log('Connection Failed');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(3000);
