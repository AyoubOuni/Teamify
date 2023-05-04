const mongoose=require('mongoose');
const ViewSchema=mongoose.Schema({
id:{
        type: String,
        required: true,
    },
id_company:{
        type: String,
        required: true,
    },
   
    id_users:{
    type:Array,
    required:true,
    default:['']
},
number:{
    type:Number,
    required:true,
    default:0
}


});
const View=mongoose.model('view',ViewSchema);
module.exports = View;