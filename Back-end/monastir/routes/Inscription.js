const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Company = require('./../Model/Company');
const Avis = require('./../Model/Avis');
const View = require('./../Model/View');
const rimraf = require('rimraf');

let fs2 = require('fs-extra');
        router.use(express.json());
router.post('/inscriptionmonastir', async function  (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try{
        

                       

view=new View({id:req.body.id,id_company:req.body.id});
avis=new Avis({id:req.body.id,id_company:req.body.id});
                    Companys= new Company({
                        id:req.body.id,
                        name:req.body.name,
                        email:req.body.email,
                        password:bcrypt.hashSync(req.body.password,10),
                        role:req.body.role,
                        phone:req.body.phone,
                        url:req.body.url,
                        location:req.body.location,
                        adresse:req.body.adresse,
                        description:req.body.description,
                        vesiaire:req.body.vesiaire,
                        buvette:req.body.buvette,
                        gradin:req.body.gradin,
                        espacefamilial:req.body.espacefamilial,
                        parking:req.body.parking,
                        numbers:req.body.numbers,
              
                    });
                    await Companys.save();
                    await avis.save();
                    await view.save();

              
                
                    res.send("valide");
                    console.log("valide");
                        }
                       
                      
                            
                                
        catch(err){console.log(err)}




});







router.post('/setcompanydata', async function  (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try{
      await Company.find({email:req.body.email}).then(async(result) => {
      
              await Company.updateOne({id:req.body.id},{email:req.body.email,name:req.body.name,location:req.body.location,phone:req.body.phone,description:req.body.description,parking:req.body.parking,vesiaire:req.body.vesiaire,buvette:req.body.buvette,gradin:req.body.gradin,espacefamilial:req.body.espacefamilial});
              console.log("changed");       
              console.log(req.body.email);       
              console.log(req.body.id);  
              res.sendStatus(200);
          });
        
                  
              }
                          
                              
      catch(err){console.log(err)
          res.sendStatus(300);

      }
  });




router.post('/getavis', async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {id_company} = req.body;

    // validate the incoming data against the schema

    try {
      await Avis.find({id_company: id_company}).then(async(result) => {
        res.send(result);
        console.log("valide");                             })
                         
     }catch (err) {
       return res.status(400).send({ message: err.message });
     }
    



});


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

    const fs = require("fs");

    router.post('/setavis', async function (req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      const { id_company, id_user } = req.body;
      const { id, avis } = id_user;
    
      try {
        const avisDoc = await Avis.findOne({ id_company });
    
        if (!avisDoc) {
          return res.status(404).send({ message: 'Avis document not found' });
        }
    
        // Check if user has already given an avis
        const userIndex = avisDoc.id_users.findIndex((user) => user.id === id);
    
        if (userIndex > -1) {
          // User has already given an avis in the past, update the existing entry
          const oldAvis = avisDoc.id_users[userIndex].avis;
          await Avis.findOneAndUpdate(
            { id_company, 'id_users.id': id },
            { $set: { 'id_users.$.avis': avis }, $inc: { avis: avis - oldAvis } }
          );
        } else {
          // User is giving an avis for the first time, create a new entry
          await Avis.findOneAndUpdate(
            { id_company },
            { $inc: { number: 1, avis: parseInt(avis) }, $addToSet: { id_users: id_user } }
          );
        }
    
        // Send the updated avis document back as response
        const updatedAvisDoc = await Avis.findOne({ id_company });
        res.send(updatedAvisDoc);
      } catch (err) {
        return res.status(400).send({ message: err.message });
      }
    });
    
    router.post('/companysetnewpassword', async function  (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            await Company.updateOne({email:req.body.email},{password:bcrypt.hashSync(req.body.password,10)});
            res.sendStatus(200);    
            console.log("changed");       
            console.log(req.body.email);       
            console.log(req.body.password);       
                  
                        }
                                
                                    
            catch(err){console.log(err)
                res.sendStatus(300);
            
            }
        });

        var multer = require('multer')
        var path = require("path");
        
        // Check for extension of image
        const getExtension = file =>{
            if (file.mimetype == "image/jpeg")
                ext =  ".jpeg"
            else
                ext =".png"
            return ext;
        }

        
        let upload = multer({
            storage: multer.diskStorage({
              destination: (req, file, callback) => {
                let type = req.params.id;
                let path = `./images/${type}`;
                fs2.mkdirsSync(path);
                callback(null, path);
              },
              filename: (req, file, callback) => {
                //originalname is the uploaded file's name with extn
                callback(null, 'picture'+ '.jpeg');
              }
            })
          });
        router.post('/saveImage/:id', upload.single('file'), (req, res, next)=>{
        
        
        
            
        if(req.file){
                    var image = "/images/" +path+"/"+ req.file.filename
        res.json({
                    status:0,
                    message:"Successfully saved",
                    path : image
                })
                }
        })
        
        
        router.get("/images/:filename/:id", async (req, res) => {
            try {
              res.sendFile(path.join(__dirname, "./../images/"+ req.params.filename+"/"+req.params.id));
            } catch (error) {
                res.send("not found");
            }
          });

          router.post('/updateImage/:id', upload.single('file'), async(req, res, next)=>{
            if(req.file){
                var image = "/images/" +path+"/"+ req.file.filename
        res.json({
                status:0,
                message:"Successfully saved",
                path : image
            })
          
        
        
        
                console.log("changed");       
       
        }
            
        
        })

          router.post('/getview', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
  
            // validate the incoming data against the schema

            try {
              await View.find({id_company: req.body.id_company}).then(async(result) => {
                res.send(result);
                console.log(result);                             })
                                 
             }catch (err) {
               return res.status(400).send({ message: err.message });
             }
            
        
        
        
        });
          router.post('/setview', async function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
  
            // validate the incoming data against the schema

            try {
              await View.find({id_company: req.body.id_company}).then(async(result) => {
                res.send(result);
                console.log(result);                             })
                                 
             }catch (err) {
               return res.status(400).send({ message: err.message });
             }
            
        
        
        
        });

         
        


// configure storage settings for multer

let upload2 = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let type = req.params.id;
      let path = `./Stadium/${type}`;
      fs2.mkdirsSync(path);
      callback(null, path);
    },
    filename: (req, file, callback) => {
      let type = req.params.id;
      let count = fs2.readdirSync(`./Stadium/${type}`).length;
      let fileName = `picture${count + 1}.jpeg`;
      callback(null, fileName);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
    files: 10 // maximum number of files to upload at once
  }
});

// route handler for uploading multiple pictures
router.post('/uploadpictures/:id',upload2.array('pictures', 10), function (req, res, next) {
  // check if there are any files to upload
  if (!req.files || req.files.length === 0) {
    res.status(400).send('No files to upload');
    return;
  }

  res.send('Files uploaded successfully');
});

router.get("/Stadium/:file/:id", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./../Stadium/"+ req.params.file+"/"+req.params.id));
  } catch (error) {
      res.send("not found");
  }
});


const deleteFolderMiddleware = (req, res, next) => {
  const type = req.params.id;
  const path = `./Stadium/${type}`;
  fs2.removeSync(path); // delete the folder and all its contents
  next();
}

const createFolderMiddleware = (req, res, next) => {
  const type = req.params.id;
  const path = `./Stadium/${type}`;
  fs2.mkdirsSync(path); // create a new folder
  next();
}

const upload3 = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let type = req.params.id;
      let path = `./Stadium/${type}`;
      callback(null, path);
    },
    
    filename: (req, file, callback) => {
      let type = req.params.id;
      let count = fs2.readdirSync(`./Stadium/${type}`).length;
      let fileName = `picture${count + 1}.jpeg`;
      callback(null, fileName);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
    files: 10 // maximum number of files to upload at once
  }
});

const deletePicture = (id, pictureNumber) => {
  const folderPath = path.join('Stadium', id);
  const pictureName = `picture${pictureNumber}.jpeg`;
  const picturePath = path.join(folderPath, pictureName);

  fs.unlink(picturePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`${pictureName} has been deleted`);
  });
};

router.post('/pictures/:number/:id', (req, res) => {
  const number = parseInt(req.params.number);
console.log(number)
console.log(req.params.id)

  if (isNaN(number) || number <= 0) {
    return res.status(400).send('Invalid number of pictures');
  }

  for (let i = 1; i <= number; i++) {
    deletePicture(req.params.id,i);
  }

  res.send(`${number} pictures have been deleted`);
});

router.post('/updatestadiumImage/:id',upload3.array('pictures',10), async(req, res, next)=>{
  if(req.files){await Company.updateOne({id:req.params.id},{numbers:req.body.number});
            console.log("changed"); 
    const image = "/Stadium/" + req.params.id;
          
            
    res.json({
      status: 0,
      message: "Successfully saved",
      path: image,
    });
    
    console.log("changed");
  } else {
    res.status(400).send('No files to upload');
  }
});








module.exports = router;