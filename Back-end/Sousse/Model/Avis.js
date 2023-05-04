const mongoose=require('mongoose');
const avisSchema=mongoose.Schema({
id:{
        type: String,
        required: true,
    },
id_company:{
    type:String,
    required:true,
},
avis:{
    type:Number,
    required:true,
    default:0
},
id_users: { type: Array, required: true,default:[''] },


number:{
    type:Number,
    required:true,
    default:0
}

});
const Avis=mongoose.model('avis',avisSchema);
module.exports = Avis;