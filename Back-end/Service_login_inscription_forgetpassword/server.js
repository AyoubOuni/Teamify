const express = require('express');
const app = express();
const New_password = require('./routes/New_password');
const Inscription = require('./routes/Inscription');
const Connexion = require('./routes/Connexion');

const mongoose = require('mongoose');
var bodyParser = require('body-parser');
     
      
      // apply them
      
      app.use(bodyParser.urlencoded({ extended: true }));
      
   
      const cors=require('cors');
      
      //mongoose.connect('mongodb+srv://root:root@cluster0.lv4bqbh.mongodb.net/Teamify', { useNewUrlParser: true });
       mongoose.connect('mongodb://localhost:27017/Teamify', { useNewUrlParser: true });
      app.options('*',cors());

      app.use(express.json());
      app.use(cors({
        origin:'http://localhost:3000'
      }));
const PORT = 4000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use('/', New_password);
app.use('/', Inscription);
app.use('/',Connexion);
