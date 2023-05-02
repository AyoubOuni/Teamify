const express = require('express');
const app = express();
const company = require('./routes/company');

const mongoose = require('mongoose');
var bodyParser = require('body-parser');
     
      
      // apply them
      
      app.use(bodyParser.urlencoded({ extended: true }));
      
   
      const cors=require('cors');
     // mongoose.connect('mongodb+srv://root:root@cluster0.lv4bqbh.mongodb.net/Teamify', { useNewUrlParser: true });

       mongoose.connect('mongodb://localhost:27017/Teamify', { useNewUrlParser: true });
      app.options('*',cors());

      app.use(express.json());
   
const PORT = 4001;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use('/accounts', company);

