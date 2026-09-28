require('dotenv').config(); 
var mysecret = process.env.SECRET_KEY
var jwt = require('jsonwebtoken')
function myAuth(req,res,next)
{
    var token = req.headers.token;

    if(token)
    {
       jwt.verify(token,mysecret)
       next();
    }
    else
    {
        res.json({"Message":"Invalid / Mis Matched Token"})
    }
}

module.exports = myAuth;
