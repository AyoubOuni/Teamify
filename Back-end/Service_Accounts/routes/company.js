const express = require('express');
const router = express.Router();

const Company = require('../Model/Company');
router.use(express.json());

//find all company
router.get('/findallcompany', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  
  try {
      await Company.find().then((result) => {
 res.send(result)
                     console.log("valide");})
                         
     }catch (err) {
       return res.status(400).send({ message: err.message });
     }
    // save the post data to the database

    })


//find company by id    
router.get('/findcompany/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  
  try {
      await Company.find({id:req.params.id}).then((result) => {
 res.send(result)
                     console.log("valide");})
                         
     }catch (err) {
       return res.status(400).send({ message: err.message });
     }
    // save the post data to the database

    })

//get company by name    
router.post('/findcompanybyname', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  
  try {
      await Company.find({name:req.body.name}).then((result) => {
 res.send(result)
                     console.log("valide");})
                         
     }catch (err) {
       return res.status(400).send({ message: err.message });
     }
    // save the post data to the database

    })


//set company avis





  
  





module.exports = router;