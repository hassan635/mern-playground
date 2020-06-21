var express = require('express');
var http = require('http');
var dotenv = require('dotenv');
var routes = require('../routes/routes.js');
var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://tezt:Windows.2000@cluster0-gpynn.mongodb.net/testdb?retryWrites=true&w=majority"
    , {useNewUrlParser: true, useUnifiedTopology: true});

var schema = new mongoose.Schema({username: 'string', password: 'string'});

var user_model = new mongoose.model('user', schema);
var admin_user = new user_model({username: 'root', password: 'toor'});

user_model.find({ username: 'dev' }).where({password: 'developer'}).count((err, count) => {
    if(err) {
            console.log(`Error occured while fetching record. Erro details: ${err.message()}`)
        }
    console.log(`Total recordes fetched = ${count}`);
});

//admin_user.save((err) => {
//    if (err) { console.log("Can't save user");}
//});

//user_model.insertMany(
//    [
//        {username: 'dev', password: 'developer'},
//        {username: 'test', password: 'tester'}, 
//        {username: 'auto', password: 'automator'}], 
//        (err) => console.log(`Error occured: ${err.message()}`))

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

app.get("/find/:id", (req, res) =>{
    user_model.findById(req.params.id, (err, data) =>{
        if(err) {
                    console.log(`${err.message}`)
                }
        res.json(data);
    });
});

app.post("/createuser", (req, res) => {
    user_model.create({username: req.body.username, password: req.body.password}, (err, data) =>{
        if (err) {console.log(err)}
        console.log(data);
    });
    res.send("Record created");
});

app.delete("/delete/:username", (req, res) => {
    user_model.deleteOne({username: req.params.username}, (err) => {
            if (err) {
                    console.log(`${err.message}`);
                }
        })
        res.send(`User ${req.params.username} deleted`);
});

app.put("/updateuser/:id/:password", (req, res) => {
    user_model.findOneAndUpdate(
        {_id: req.params.id},
        {
            $set: {
                password: req.params.password
            }
            
        },
        {upsert: true}
        ).catch((err) => {console.log(err)});
        res.send("Record Updated!")
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