var express = require('express')
var jwt = require('jsonwebtoken')

var router = express.Router();
require('dotenv').config(); // 1

var multer = require('multer');

var bcrypt = require('bcryptjs')




var myAuth = require('../middleware/mymiddleware');

var {MongoClient, ObjectId} = require('mongodb')

 var token;
var mysecret = process.env.SECRET_KEY

var mongoserver =  new MongoClient(process.env.MONGO_URI); //2
mongoserver.connect()
var db = mongoserver.db('hassan2501a')

router.get('/abc',myAuth,async (req,res) => {
    

    var records = await db.collection('users').find().toArray()
    res.json(records)
})
router.post('/insertuser',async (req,res) => {
    var userinput = req.body;
    
    var email = userinput.email;


    var rec = await db.collection('users').insertOne(userinput)
    if(rec)
    {
       token = jwt.sign({
            userinput
        },
            mysecret,
            {expiresIn:'1h'}
        )

        res.json({"Message":"Record Inserted","Token":token})
    }
    else
    {
        res.json({"Message":"Error While Inserting Record"})
    }
})

router.get('/login',async(req,res) => {
    var logincreds = req.body;
    var user = await db.collection('users').findOne({
        "email":logincreds.email,
        "password":logincreds.password
    })
    if(user)
    {
    /// to check user ka token
      jwt.verify(token,mysecret,function(err){
        if(err)
        {
            res.json({"Error":"Token Mismatch"})
        }
        else
        {
              res.json({"Message":"Login Successfull"})
        }
      })
    }
    else
    {
        res.json({"Message":"Error , No User Found"})
    }

});


router.delete('/deleterecord', async (req,res)=>{
    var userid = req.body.id;  //123xyz

  var deleteduser = await db.collection('users').deleteOne({"_id":new ObjectId(userid)});
  if(deleteduser)
  {
    res.json({"Message":"Deleted Succesfully"})
  }
  else
  {
    res.json({"Message":"Error , while deleting"})
  }
})
router.put('/updateuser',async (req,res) => {
    var userinput = req.body
   

   var updateduser = await db.collection('users').updateOne(
        {"_id":new ObjectId(userinput.id)},

        {$set:{"name":userinput.name}}
    )

    if(updateduser)
    {
        res.json({"Message":"User Updated"})
    }
    else
    {
        res.json({"Message":"Error, While Updating"})
    }
})



router.post('/hashpassword',async(req,res) => {
    var input = req.body;
    var normalpass = input.password;
    var hashpass = await bcrypt.hash(normalpass,10)
    var user = await db.collection('users').insertOne({
        "Name":"Ahmed",
        "Password":hashpass
    })
    res.json({"Normal Password":normalpass,"Hashed Password":hashpass})
});

router.post('/loginuser',async(req,res) => {
    var input = req.body;
    var user = await db.collection('users').findOne({"Name":"Ahmed"})
    var isMatched =await bcrypt.compare(input.password,user.Password);
    if(isMatched)
    {
        res.json({
            "Message":"Password Matched"
        })
    }
    else
    {
        res.json({
            "Message":"Password did not matched"
        })
    }
})
module.exports = router;
