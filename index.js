var adminApis = require('./admin/admin');
var usersApis = require('./users/users');
var customerApis = require('./customer/customer');

var {MongoClient} = require('mongodb')
var mongoserver =  new MongoClient('mongodb://localhost:27017/');




var express = require('express')
var app = express();
app.use(express.json());
app.use('/admin',adminApis)
app.use('/users',usersApis)
app.use('/customer',customerApis)

app.listen(4000,()=>{console.log("Server is running....")});


