const express = require('express');
const router = express.Router();
const Reservation = require('../Model/Reservation');
const Calendar = require('../Model/Calendar');
const fileUpload = require('express-fileupload');
const fs = require('fs');
router.use(fileUpload());

        router.use(express.json());
        router.post('/add', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            const {id,id_company,id_stadium,name_stadium,name_company,id_user,name_user,pdf,date,hour} = req.body;
  
            // validate the incoming data against the schema
            const reservation = new Reservation({id,id_company,id_stadium,name_stadium,id_user,name_user,pdf,date,hour,name_company});
            var reserv= {"time":`${date}-${hour}`};

            try {
              await Calendar.updateOne({id_stadium: id_stadium},{ $push: { reservation:reserv } }).then(async(result) => {
                await reservation.save();            
                res.send("valide");
                console.log("valide");                             })
                                 
             }catch (err) {
               return res.status(400).send({ message: err.message });
             }
            
        
        
        
        });




        router.post('/getbyuserandstade', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
           
  try {
    await Reservation.find({id_user:req.body.id,id_stadium:req.body.id_stadium}).then((result) => {
      if(result.length===0){
res.sendStatus(500)
      }else{res.send(result)
                   console.log("valide");}
})
                       
   }catch (err) {
     return res.status(400).send({ message: err.message });
   }
        
        
        
        });
        router.post('/getbyuser', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
           
  try {
    await Reservation.find({id_user:req.body.id}).then((result) => {
      if(result.length===0){
res.sendStatus(500)
      }else{res.send(result)
                   console.log("valide");}
})
                       
   }catch (err) {
     return res.status(400).send({ message: err.message });
   }
        
        
        
        });




        router.post('/getbystadium', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
           
  try {
    await Reservation.find({id_stadium:req.body.id}).then((result) => {
res.send(result)
                   console.log("valide");})
                       
   }catch (err) {
     return res.status(400).send({ message: err.message });
   }
        
        
        
        });
        router.post('/api/save-pdf', (req, res) => {
          // Get the PDF file from the request
          const pdfFile = req.files.pdf;
          const id = req.body.id;
          console.log(pdfFile)
          // Save the PDF file to disk
          pdfFile.mv(`./Contrat/${id}.pdf`, err => {
            if (err) {
              console.error(err);
              res.status(500).send('Error saving PDF');
            } else {
              res.send('PDF saved successfully');
            }
          });
        });
        
        
        
        router.get('/api/pdf/:filename', (req, res) => {
          const filename = req.params.filename;
          const filePath = path.join(__dirname, '../Contrat', filename);
        
          res.sendFile(filePath);
        });
      
        
      

        const path = require('path');

        
       
        
        
        router.post('/getbycompany', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
           
  try {
    await Reservation.find({id_company:req.body.id}).then((result) => {
      if(result.length===0){
        res.sendStatus(500)
              }else{res.send(result)
                           console.log("valide");}
        })
                               
           }catch (err) {
     return res.status(400).send({ message: err.message });
   }
        
        
        
        });




        router.get('/getbystadium_name', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
           
  try {
    await Reservation.find({name_stadium:req.body.name_stadium}).then((result) => {
res.send(result)
                   console.log("valide");})
                       
   }catch (err) {
     return res.status(400).send({ message: err.message });
   }
        
        
        
        });




        router.get('/getbydate', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
           
  try {
    await Reservation.find({date:req.body.date}).then((result) => {
res.send(result)
                   console.log("valide");})
                       
   }catch (err) {
     return res.status(400).send({ message: err.message });
   }
        
        
        
        });




        router.get('/getbyid', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
           
  try {
    await Reservation.find({id:req.body.id}).then((result) => {
res.send(result)
                   console.log("valide");})
                       
   }catch (err) {
     return res.status(400).send({ message: err.message });
   }
        
        
        
        });



        router.get('/getall', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
           
  try {
    await Reservation.find().then((result) => {
res.send(result)
                   console.log("valide");})
                       
   }catch (err) {
     return res.status(400).send({ message: err.message });
   }
        
        
        
        });







       


module.exports = router;