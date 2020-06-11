const router = express.Router;

router.get("/about", (req, res, next) => {
    res.send(`Captured request path ${req.path} in routes`);
});

module.exports = router;