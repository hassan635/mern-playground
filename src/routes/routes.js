var express = require('express');
var router = express.Router();

router.get("/about", (req, res) => {
    res.send(`Captured request path ${req.baseUrl} in routes`);
});

router.get("/admin-panel", (req,res) => {
    res.redirect("/")
});

router.get("/login", (req, res) => {
    res.send("Login Page");
});


router.post("/json-endpoint", (req, res) => {
    if(req.query.isvalid === "valid")
    {
        res.sendStatus(200).send(req.body);
    }
    else{
        res.sendStatus(400).sendJson({"message": "Invalid request"});
    }
});

module.exports = router;