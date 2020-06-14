var express = require('express');
var router = express.Router();
router.use(express.json());

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
        res.json(req.body);
    }
    else{
        res.status(400).json({message: "Invalid request"});
    }
});

module.exports = router;