const express=require('express');
const Ingredient=require('../Schema/IngredientSchema');

const router=express.Router();

router.post('/shopping-list',(req,res,next)=>{
  console.log(req.body);
  const ingredient=new Ingredient({ingName:req.body.ingName,ingAmount:req.body.ingAmount});
  ingredient.save().then(savedIngredient=>{
    res.status(200).json({
      message:'Ingredient Saved Successfully',
      ingredient:savedIngredient
    })
  })
})

router.get('/shopping-list',(req,res,next)=>{
  Ingredient.find().then(response=>{
    console.log(response);
    res.status(200).json({
      message:'Ingredients fetched successfully',
      ingredients:response
    })
  })
})

router.delete('/shopping-list/:id',(req,res,next)=>{
  console.log(req.params.id);
  Ingredient.deleteOne({_id:req.params.id}).then(response=>{
    res.status(200).json({
      message:'Ingredient deleted successfully'
    })
  })
})

router.get('/shopping-list/:id',(req,res,next)=>{
  Ingredient.findById({_id:req.params.id}).then(response=>{
    res.json({
      message:'Recipe fetched successfully',
      ingredient:response
    })
  })
})

router.put('/shopping-list/:id',(req,res,next)=>{
  //console.log(req.params);
  const ingredient=new Ingredient({
    _id:req.params.id,
    ingName:req.body.ingName,
    ingAmount:req.body.ingAmount
  });
  //console.log(ingredient);
  Ingredient.updateOne({_id:req.params.id},ingredient).then(response=>{
    res.json({
      message:'Ingredient updated successfully',
      updatedIngredient:response
    })
  })
})

module.exports=router;
