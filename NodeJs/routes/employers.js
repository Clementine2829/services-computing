const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    //res.json({
    //    posts: {
    //        title: "My first post",
    //        description: "This is some random stuff that you should not access"
    //    }
    //});
    res.send(req.user);

    //find a user by their token
    //User.findbyOne({ _id: req.user });
});

module.exports = router;
