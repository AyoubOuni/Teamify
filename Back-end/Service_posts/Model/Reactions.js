const mongoose=require('mongoose');


const reactionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    id_users: { type: Array, required: true,default:[''] },
    reaction: { type: Object, required: true,
        default: {"like":0,"dislike":0,"heart":0,


}  },
  
  });
const Reaction=mongoose.model('reaction',reactionSchema);
module.exports = Reaction;