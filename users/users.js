var express = require('express');
var userRouter = express.Router();

userRouter.get('/dashboard',(req,res) => {
    res.json({"Message":"User Dashboard"})
})

module.exports = userRouter