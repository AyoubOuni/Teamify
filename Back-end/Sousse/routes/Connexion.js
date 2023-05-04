const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Company = require('./../Model/Company');
var a=false;
var b=false;
router.use(express.json());

      
        
        router.get('/getallsoussestadium', async function (req, res) {
          
                await Company.find().then((result) => {
                  res.send(result)});});
        router.post('/getstadiumbyid', async function (req, res) {
          
                await Company.find({id:req.body.id}).then((result) => {
                  res.send(result)});});



             


module.exports = router;