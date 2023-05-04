const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
id:{
        type: String,
        required: true,
    },
nom:{
    type:String,
    required:true,
},
prenom:{
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
    type:String,
    required:true,
},
url:{
    type:String,
    required:true,
},role:{
    type:String,
    required:true,
}

});
const User=mongoose.model('user',userSchema);
module.exports = User;