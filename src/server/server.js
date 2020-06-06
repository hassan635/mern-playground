var express = require('express');
var http = require('http');

var app = express();

app.get("/", (req, res) => {
    res.send("Assalam-o-Alaikum");
});

var server = http.createServer(app).listen(8081);

console.log("Listening ON prt: " + server.address().port);