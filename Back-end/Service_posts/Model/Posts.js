const mongoose=require('mongoose');


const postSchema = new mongoose.Schema({
    id: { type: String, required: true },
    id_user: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
    url: { type: String,  required: true },
  });
const Post=mongoose.model('post',postSchema);
module.exports = Post;