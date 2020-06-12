var express = require('express');
var router = express.Router();

router.get("/about", (req, res) => {
    res.send(`Captured request path ${req.baseUrl} in routes`);
});

router.post("/json-endpoint", (req, res) => {
    if(req.query.isvalid === "valid")
    {
        res.status(200).send(req.body);
    }
    else{
        res.status(400).send({message: "Invalid request"});
    }
});

module.exports = router;