const express = require('express');
const app = express();

const add_stadium = require('./routes/add_stadium');
const reservation = require('./routes/reservation');
const calendar = require('./routes/calendar');
const view = require('./routes/nombre_vue');

const mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(express.static('public'));

      
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
const PORT = 4002;
mongoose.set('strictQuery', false);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use('/stadium',add_stadium);
app.use('/reservation',reservation);
app.use('/calendar',calendar);
app.use('/view',view);
