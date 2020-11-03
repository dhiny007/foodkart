const express=require('express');
const multer=require('multer');
const Recipe=require('../Schema/RecipeSchema');

const router=express.Router();

const MIME_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
};

const storage=multer.diskStorage({
  destination: (req,file,cb) => {
    const isValid=MIME_TYPE_MAP[file.mimetype];
    let error=new Error('Invalid Mime Type!');
    if(isValid){
      error=null;
    }
    cb(error,'Backend/images');
  },
  filename: (req,file,cb) => {
    const name=file.originalname.toLowerCase().split(' ').join('-');
    const ext=MIME_TYPE_MAP[file.mimetype];
    cb(null,name+'-'+Date.now()+ '.' + ext);
  }
})

router.post('/recipes/new',multer({storage:storage}).single('image'),(req,res,next) => {
  const url=req.protocol+'://'+req.get('host');
  const recipe=new Recipe({
    heading:req.body.heading,
    content:req.body.description,
    imagePath:url+'/images/'+req.file.filename
  })
  recipe.save().then(createdRecipe => {
    console.log(createdRecipe);
    res.status(201).json({
      message:'Recipe saved successfully',
      recipe:{...createdRecipe}
    })
  })
})

router.get('/recipes/new',(req,res,next) => {
  Recipe.find().then(response=>{
    console.log(response);
    res.status(200).json({
      message:'Recipes fetched successfully',
      recipe:response
    })
  })
})

router.get('/recipes/new/:id',(req,res,next)=>{
  Recipe.findById({_id:req.params.id}).then(response=>{
    res.status(200).json({
      recipe:response
    })
  })
})

router.delete('/recipes/:id',(req,res,next)=>{
  Recipe.deleteOne({_id:req.params.id}).then(response=>{
    //console.log(response);
    if(response.deletedCount>0){
      res.status(200).json({
        messsage:'Recipe Deleted Successfully'
      })
    }
  })
})

module.exports=router;
