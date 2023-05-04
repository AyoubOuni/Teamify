const mongoose=require('mongoose');
const companySchema=mongoose.Schema({
id:{
        type: String,
        required: true,
    },
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
},

phone:{
    type:Number,
    required:true,
},
role:{
    type:String,
    required:true,
},
location:{
    type:String,
    required:true,
},
adresse:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:false,
    default:'',
},
vesiaire:{
    type:Boolean,
    required:true,
    default:false
},
buvette:{
    type:Boolean,
    required:true,
    default:false
},
gradin:{
    type:Boolean,
    required:true,
    default:false
},
espacefamilial:{
    type:Boolean,
    required:true,
    default:false
},
parking:{
    type:Boolean,
    required:true,
    default:false
},
url:{
    type:String,
    required:true,
}
,
numbers:{
    type:String,
    required:true,
}

});
const Company=mongoose.model('company',companySchema);
module.exports = Company;