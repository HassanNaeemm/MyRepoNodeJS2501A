var express = require('express');
var adminRouter = express.Router();

adminRouter.get('/dashboard',(req,res)=> {
    res.json({"Message":"Dashboard Working"})
})
adminRouter.get('/admintest',(req,res)=> {
    res.json({"Message":"Just to test admin"})
})

module.exports= adminRouter
