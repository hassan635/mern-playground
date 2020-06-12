var express = require('express');
var http = require('http');
var dotenv = require('dotenv');
var routes = require('../routes/routes.js');

var app = express();
dotenv.config();

app.use((req, res, next) => {
    console.log("Yepee");
    next();
});

app.use(express.json());

app.use((req, res, next) => {
    console.log("Root MWARE: Request path is: " + req.path);
    next();
});

app.use("/section1", routes);

app.get("/", (req, res) => {
    if(process.env.GREETING==='islam')
    {
        res.send("Assalam-o-Alaikum");
    }
    else {
            res.send("Halo");
        }
});

app.use("/section2", routes);


function logIp(req, res, next){
    console.log("Request came from: " + req.ip);
    next();
}

function logMethod(req, res, next){
    console.log("Request method is: " + req.method);
    next();
}

var requestDetailsLogger = [logIp, logMethod];

app.get("/mware/request/logger", requestDetailsLogger, (req, res, next) =>{
    res.send("Done");
});


app.get("/request/url", (req, res) => {
    res.send("Request query id is: " + req.query.id);
});

app.get("/request/url/:region", (req, res) => {
    res.send("Request query region is: " + req.params.region)
});

app.get("/request/set-cookie", (req, res) => {
    res.cookie('name', 'hassan');
    res.cookie('secure-cookie', 't0PZ3Cr3T', {httpOnly: true});
    res.send(200, "Cookie set");
});



var server = http.createServer(app).listen(8081);

console.log("Listening ON prt: " + server.address().port);