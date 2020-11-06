const mongoose=require('mongoose');

const ingSchema=mongoose.Schema({
  'ingName':{type:String,required:true},
  'ingAmount':{type:Number,required:true}
})

module.exports=mongoose.model('Ingredient',ingSchema);
