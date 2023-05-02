const express = require('express');
const router = express.Router();
const Calendar = require('./../Model/Calendar');

        router.use(express.json());
  



        
        router.get('/getcalendarbystadium/:id', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
           
  try {
    await Calendar.find({id_stadium:req.params.id}).then((result) => {
res.send(result)
                   console.log("valide");})
                       
   }catch (err) {
     return res.status(400).send({ message: err.message });
   }
        
        
        
        });

        
        router.get('/getcalendarbycompany/:id', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
           
  try {
    await Calendar.find({id_company:req.params.id}).then((result) => {
res.send(result)
                   console.log("valide");})
                       
   }catch (err) {
     return res.status(400).send({ message: err.message });
   }
        
        
        
        });
        
        router.get('/getcalendarbyid/:id', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
           
  try {
    await Calendar.find({id:req.params.id}).then((result) => {
res.send(result)
                   console.log("valide");})
                       
   }catch (err) {
     return res.status(400).send({ message: err.message });
   }
        
        
        
        });

        router.put('/update/:id', async function (req, res) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          const {reservation } = req.body;

         
try {
  await Calendar.updateOne({id: req.params.id},{ $push: { reservation: reservation } }).then((result) => {
res.send(result)
                 console.log("valide");})
                     
 }catch (err) {
   return res.status(400).send({ message: err.message });
 }
      
      
      
      });







     



        







       


module.exports = router;