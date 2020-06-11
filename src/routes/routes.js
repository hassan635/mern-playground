var express = require('express');
var router = express.Router();

router.get("/about", (req, res) => {
    res.send(`Captured request path ${req.baseUrl} in routes`);
});

module.exports = router;