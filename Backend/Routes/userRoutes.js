const express=require('express');
const User=require('../Schema/UserSchema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const router=express.Router();

router.post('/auth/signup',(req,res,next)=>{
  bcrypt.hash(req.body.password,10)
  .then(hash => {
    const user=new User({
      email:req.body.email,
      password:hash
    });
    user.save().then((result) => {
      res.status(201).json({
        message: "Signup Successful",
        result:result
      })
    })
    .catch(error => {
      res.status(500).json({
        message:"Email already registered!",
        error:error
      })
    })
  })
})

router.post('/auth/login',(req,res,next) =>{
  let fetchedUser;
  User.findOne({email:req.body.email}).then(
    user => {
      if(!user){
       return res.status(401).json({
        message:'Email not found!'
      })
     }
     fetchedUser=user;
     return bcrypt.compare(req.body.password,user.password)
    })
    .then(response => {
      if(!response){
        return res.status(401).json({
          message:'Incorrect login credentials!'
        })
      }
      const token=jwt.sign({email:fetchedUser.email,id:fetchedUser._id},'secret_this_should_be_longer',{expiresIn:'1h'});
      res.status(200).json({
        message:'User Login Successful',
        token:token,
        expiresIn:3600,
        id:fetchedUser._id
      })
    })
      .catch(error => {
        res.status(401).json({
          message:'Authentication failed',
          error:error
        })
      })
    }
  )

module.exports=router;
