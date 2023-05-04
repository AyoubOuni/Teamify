const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./../Model/User');
const Company = require('./../Model/Company');
var a=false;
var b=false;
router.use(express.json());

      
        router.post('/login', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                await User.find({email:req.body.email}).then((result) => {
                    if(result.length===0){
a=false;                            }
                    else {

a=true;}});
                await Company.find({email:req.body.email}).then((result) => {
                    if(result.length===0){
b=false;                            }
                    else {

b=true;}});


if ((a===false)&&(b===false)){
    res.sendStatus(400);

}
else if ((a===true)&&(b===false)){
    await User.find({email:req.body.email}).then((result) => {

    bcrypt.compare(req.body.password, result[0].password, function(err, result) {
            if (result) {
                console.log('valide');
                 User.find({email:req.body.email}).then((result2) => {
                    res.send(result2);

                console.log(result2);});
            }
            else{
                console.log('invalide')
                res.sendStatus(400);

            }
})
    })}
else if ((a===false)&&(b===true)){
    console.log("here");
    await Company.find({email:req.body.email}).then((result) => {

    bcrypt.compare(req.body.password, result[0].password, function(err, result) {
            if (result) {
                console.log('valide');
                 Company.find({email:req.body.email}).then((result2) => {
                    res.send(result2);

                console.log(result2);});
            }
            else{
                console.log('invalide')
                res.sendStatus(400);

            }
})
    })}


                                        }
                catch(err){console.log(err)}});




        router.post('/getbyid', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                await User.find({id:req.body.id}).then((result) => {
                    if(result.length===0){
a=false;                            }
                    else {

a=true;}});
                await Company.find({id:req.body.id}).then((result) => {
                    if(result.length===0){
b=false;                            }
                    else {

b=true;}});


if ((a===false)&&(b===false)){
    res.sendStatus(400);

}
else if ((a===true)&&(b===false)){
    await User.find({id:req.body.id}).then((result) => {

   res.send(result)
    })}
else if ((a===false)&&(b===true)){
   
    await Company.find({id:req.body.id}).then((result) => {

        res.send(result)
    })}


                                        }
                catch(err){console.log(err)}});
        router.get('/getallstadium', async function (req, res) {
          
                await Company.find().then((result) => {
                  res.send(result)});});
        router.post('/getstadiumbyid', async function (req, res) {
          
                await Company.find({id:req.body.id}).then((result) => {
                  res.send(result)});});



             


module.exports = router;