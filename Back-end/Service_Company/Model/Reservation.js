const mongoose=require('mongoose');
const reservationSchema=mongoose.Schema({
id:{
        type: String,
        required: true,
    },
id_company:{
        type: String,
        required: true,
    },
id_stadium:{
    type:String,
    required:true,
},
name_stadium:{
    type:String,
    required:true,
},
name_company:{
    type:String,
    required:true,
},
id_user:{
    type:String,
    required:true,
},

name_user:{
    type:String,
    required:true,
},
pdf:{
    type:String,
    required:true,
},
date:{
    type:String,
    required:true,
},
hour:{
    type:String,
    required:true,
},



});
const Reservation=mongoose.model('reservation',reservationSchema);
module.exports = Reservation;