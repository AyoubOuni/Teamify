const express = require('express');
const router = express.Router();

const Post = require('./../Model/Posts');
const Reaction = require('./../Model/Reactions');
router.use(express.json());

//add Post
router.post('/add', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

    const { id,id_user, content, author,url } = req.body;
  
    // validate the incoming data against the schema
    const post = new Post({ id,id_user, content, author,url });
    const reaction = new Reaction({ id});
    try {
      await post.save();            
      await reaction.save();            
                    res.send("valide");
                    console.log("valide");
                        
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  
    // save the post data to the database

    })


//get all post    
router.get('/all', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
 try {
     await Post.find().then((result) => {
      if(result.length===0){
        res.sendStatus(500)
              }else{
res.send(result)
                    console.log("valide");}
                  })
                        
    }catch (err) {
      return res.status(400).send({ message: err.message });
    }
  

  })


//get one post by id
router.post('/getone', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
 try {
     await Post.find({id:req.body.id}).then((result) => {
res.send(result)
                    console.log("valide");})
                        
    }catch (err) {
      return res.status(400).send({ message: err.message });
    }
  

  })

//get one post by id
router.post('/getbyuser', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
 try {
     await Post.find({id_user:req.body.id_user}).then((result) => {
      if(result.length===0){
        res.sendStatus(500)
              }else{
res.send(result)
                    console.log(result);}
                  })
                        
    }catch (err) {
      return res.status(400).send({ message: err.message });
    }
  

  })

//delete one post by id
router.post('/delete', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
 try {
     await Post.deleteOne({id:req.body.id}).then(async() => {
      try {
        await Post.find().then((result) => {
         if(result.length===0){
           res.sendStatus(500)
                 }else{
   res.send(result)
                       console.log(result);}
                     })
                           
       }catch (err) {
         return res.status(400).send({ message: err.message });
       }
                  
                  
                  
                  })
                        
    }catch (err) {
      return res.status(400).send({ message: err.message });
    }
  

  })
//delete one post by id
router.post('/delete2', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
 try {
     await Post.deleteOne({id:req.body.id}).then(async() => {
      try {
        await Post.find({id_user:req.body.id_user}).then((result) => {
         if(result.length===0){
           res.sendStatus(500)
                 }else{
   res.send(result)
                       console.log(result);}
                     })
                           
       }catch (err) {
         return res.status(400).send({ message: err.message });
       }
                  
                  
                  
                  })
                        
    }catch (err) {
      return res.status(400).send({ message: err.message });
    }
  

  })
//update one post by id
router.post('/update', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
      await Post.updateOne({id:req.body.id},{content:req.body.content}).then(async() => {
       try {
         await Post.find().then((result) => {
          if(result.length===0){
            res.sendStatus(500)
                  }else{
    res.send(result)
                        console.log(result);}
                      })
                            
        }catch (err) {
          return res.status(400).send({ message: err.message });
        }
 
 
     })
                         
     }catch (err) {
       return res.status(400).send({ message: err.message });
     }
  

  })
router.post('/update2', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
 try {
     await Post.updateOne({id:req.body.id},{content:req.body.content}).then(async() => {
      try {
        await Post.find({id_user:req.body.id_user}).then((result) => {
         if(result.length===0){
           res.sendStatus(500)
                 }else{
   res.send(result)
                       console.log(result);}
                     })
                           
       }catch (err) {
         return res.status(400).send({ message: err.message });
       }


    })
                        
    }catch (err) {
      return res.status(400).send({ message: err.message });
    }
  

  })

//get reaction by id post  
router.get('/getreaction', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
 try {
     await Reaction.find().then((result) => {
res.send(result)
                    console.log("valide");})
                        
    }catch (err) {
      return res.status(400).send({ message: err.message });
    }
  

  })
//set reaction
router.put('/setreaction/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const { id_users, reaction } = req.body;
    if(reaction === null ){
      console.log('tfffft')
    }

    const reactionDoc = await Reaction.findOne({ id: req.params.id });

    if (!reactionDoc) {
      return res.status(404).send({ message: 'Reaction not found' });
    }

    const userIndex = reactionDoc.id_users.findIndex((user) => user.id === id_users.id);

    let updateQuery;

    if (userIndex > -1) {
      // User has already reacted
      const oldReactionType = reactionDoc.id_users[userIndex].reaction;

      if (oldReactionType === reaction) {
        // User has already reacted with the same reaction
        return res.sendStatus(200);
      }

      updateQuery = {
        $inc: {
          [`reaction.${oldReactionType}`]: -1,
          [`reaction.${reaction}`]: 1,
        },
        $set: {
          [`id_users.${userIndex}`]: id_users,
        },
      };
    } else {
      // User has not reacted yet
      updateQuery = {
        $addToSet: { id_users: id_users },
        $inc: { [`reaction.${reaction}`]: 1 },
      };
    }

    const updatedReactionDoc = await Reaction.findOneAndUpdate(
      { id: req.params.id },
      updateQuery,
      { new: true } // Return the updated document
    );

    res.sendStatus(200);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});




   

  
  





module.exports = router;