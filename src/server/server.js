var express = require('express');
var http = require('http');

var app = express();

app.get("/", (req, res) => {
    res.send("Assalam-o-Alaikum");
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