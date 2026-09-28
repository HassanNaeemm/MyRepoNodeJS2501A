var http = require('http')
var port = 4000

var server = http.createServer((req,res) => {

    //GET API
    if(req.url == "/xyz" && req.method =="GET")
    {
        //Any Code / Any Logic Will Go Here
        // console.log("Xyz Printed")
        res.end("Xyz Printed")
    }
     //GET API
    if(req.url == "/abc" && req.method =="GET")
    {
        //Any Code / Any Logic Will Go Here
        res.end("ABC Printed")
    }
   
})
server.listen(port,() => {
    console.log("Server is active..."+port)
})
