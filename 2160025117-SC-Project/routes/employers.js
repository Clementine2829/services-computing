const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

router.get('/', verify, async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //user is logged in, continue to serve them with jobs
    try {
        const employers = await User.find(
            { usertype: "employer" },
            {
                _id: 1,
                name: 1,
                email: 1
            }).limit(10);
        return res.status(200).json(employers);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// get user by id
router.get('/:userId', verify, async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //user is logged in, continue it is safe
    try {
        const employer = await User.findOne(
            { usertype: "employer" },
            {
                _id: 1,
                name: 1,
                email: 1
            }).limit(10);
        return res.status(200).json(employer);
        res.json({ 'message': "Employer with the provided ID could not be found" });
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;
