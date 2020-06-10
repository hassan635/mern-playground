var express = require('express');
var http = require('http');
var dotenv = require('dotenv');

var app = express();
dotenv.config();

app.use((req, res, next) => {
    console.log("Yepee");
    next();
});

app.get("/", (req, res) => {
    if(process.env.GREETING==='islam')
    {
        res.send("Assalam-o-Alaikum");
    }
    else {
            res.send("Halo");
        }
});

function logIp(req, res, next){
    console.log("Request came from: " + req.ip);
    next();
}

function logPath(req, res, next){
    console.log("Request path is: " + req.path);
    next();
}

var requestDetailsLogger = [logIp, logPath];

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