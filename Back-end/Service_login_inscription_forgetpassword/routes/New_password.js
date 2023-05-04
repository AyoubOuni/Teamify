const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Model/User');
const Company = require('../Model/Company');
const {sendkeymail} = require('../Nodemailer/Forget_password.js');
        router.use(express.json());

        var a=false;
        var b=false;
                
        var userskey=[];

       
        



        var obj = {};
        router.post('/checkemail', async function  (req, res) {
            
            var id_token= Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000);
        
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
            await User.find({email:req.body.email}).then((result) => {
                if(result.length==0){
a=false;                            }
                else {

a=true;}});
            await Company.find({email:req.body.email}).then((result) => {
                if(result.length==0){
b=false;                            }
                else {

b=true;}});
console.log(a);
console.log(b);
if ((a==false)&&(b==false)){
    res.sendStatus(400);
}
else if ((a===true)&&(b===false)){

        userskey[req.body.email]= id_token;
        setTimeout(function () {
         delete userskey[req.body.email];
         obj=[{}];
        }
        ,120000);
        console.log(userskey);
         sendkeymail(req.body.email,id_token);
         res.sendStatus(200);
         var email=req.body.email;
         obj=[{email,id_token}];

    }

    
else if ((a===false)&&(b===true)){

        userskey[req.body.email]= id_token;
        setTimeout(function () {
         delete userskey[req.body.email];
         obj=[{}];
        }
        ,120000);
        console.log(userskey);
         sendkeymail(req.body.email,id_token);
         res.sendStatus(200);
         var email=req.body.email;
         obj=[{email,id_token}];

    }

                            }
                                    
                                        
                catch(err){console.log(err)}
            });
        
        
        router.get('/checkkey', async function  (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        
            res.send(obj);
            console.log(userskey);
           
        });
        router.post('/setnewpassword', async function  (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{

                await User.find({email:req.body.email}).then((result) => {
                    if(result.length==0){
    a=false;                            }
                    else {
    
    a=true;}});
                await Company.find({email:req.body.email}).then((result) => {
                    if(result.length==0){
    b=false;                            }
                    else {
    
    b=true;}});
    console.log(a);
    console.log(b);
    if ((a==false)&&(b==false)){
        res.sendStatus(400);
    }
    else if ((a===true)&&(b===false)){
        await User.updateOne({email:req.body.email},{password:bcrypt.hashSync(req.body.password,10)});
        res.sendStatus(200);    
        console.log("changed");       
        console.log(req.body.email);       
        console.log(req.body.password);
        }
    
        
    else if ((a===false)&&(b===true)){
    
        await Company.updateOne({email:req.body.email},{password:bcrypt.hashSync(req.body.password,10)});
        res.sendStatus(200);    
        console.log("changed");       
        console.log(req.body.email);       
        console.log(req.body.password);
    
        }
    
                                


                       
                      
                            }
                                    
                                        
                catch(err){console.log(err)
                    res.sendStatus(300);
                
                }
            });

module.exports = router;