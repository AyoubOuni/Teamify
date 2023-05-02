const mongoose=require('mongoose');
const CalendarSchema=mongoose.Schema({
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
reservation:{
    type:Array,
    required:true,
    default:['']
},


});
const Calendar=mongoose.model('calendar',CalendarSchema);
module.exports = Calendar;