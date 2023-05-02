const express = require('express');
const router = express.Router();
const View = require('../Model/View');

        router.use(express.json());
        router.post('/setview', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
  
            // validate the incoming data against the schema

            try {
              await View.find({id_company: req.body.id_company}).then(async(result) => {
                if(result[0].id_users.includes(req.body.id_user)){
                  res.sendStatus(500);
                }
                else{

                  await View.updateOne({id_company: req.body.id_company},{ $push: { id_users: req.body.id_user } ,$inc: { number: 1 } }).then((result2) => {
                    res.send(result2)
                                     console.log("valide");})
                                         
                     }
                
                                         })
                                 
             }catch (err) {
               return res.status(400).send({ message: err.message });
             }
            
        
        
        
        });
        router.post('/getbycompany', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
           
            try {
              await View.find({id_company:req.body.id_company}).then((result) => {
          res.send(result)
                             console.log("valide");})
                                 
             }catch (err) {
               return res.status(400).send({ message: err.message });
             }
                  
                  
                  
                  });
        
        
        
        
    



module.exports = router;