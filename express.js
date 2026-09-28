//EXPRESS REQUIRE
var express = require('express')
var server = express(); //express execute
server.use(express.json())
var port = 5000
//API
server.get('/xyz',(req,res) => {
    // console.log("Printed")
    res.json({"Message":"Record Printed"})
})
server.get('/abc',(req,res) => {
   res.json({"Message":"Record Printed 2"})
})

server.delete('/delete1',(req,res)=>{
    res.json({"Message":"Record Deleted 1"})
})
server.delete('/delete2',(req,res)=>{
    res.json({"Message":"Record Deleted 2"})
})

//PORT DEFINE
server.listen(port,()=>{
    console.log("Server is running on "+port)
})
