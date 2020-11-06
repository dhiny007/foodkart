const express=require('express');
const Ingredient=require('../Schema/IngredientSchema');

const router=express.Router();

router.post('/shopping-list',(req,res,next)=>{
  console.log(req.body);
  const ingredient=new Ingredient({ingName:req.body.ingName,ingAmount:req.body.ingAmount});
  ingredient.save().then(savedIngredient=>{
    res.status(200).json({
      'message':'Ingredient Saved Successfully',
      'ingredient':savedIngredient
    })
  })
})

module.exports=router;