const mongoose=require('mongoose');
const stadiumSchema=mongoose.Schema({
id:{
        type: String,
        required: true,
    },
id_company:{
        type: String,
        required: true,
    },
name:{
    type:String,
    required:true,
},
dimension:{
    type:String,
    required:true,
},
numberofplayers:{
    type:String,
    required:true,
},
duration:{
    type:String,
    required:true,
},
price:{
    type:String,
    required:true,
},

generation:{
    type:Number,
    required:true,
},
ledlighting:{
    type:Boolean,
    required:true,
},
times:{
    type:Array,
    required:true,
    default:['']
},


});
const Stadium=mongoose.model('stadium',stadiumSchema);
module.exports = Stadium;