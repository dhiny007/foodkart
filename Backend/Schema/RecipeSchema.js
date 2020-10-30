const mongoose=require('mongoose');

const recipeSchema=mongoose.Schema({
  heading:{type:String,required:true},
  content:{type:String,required:true},
  imagePath:{type:String,required:true}
});

module.exports=mongoose.model('Recipe',recipeSchema);
