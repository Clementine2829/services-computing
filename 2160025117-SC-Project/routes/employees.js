const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

router.get('/', verify, async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //user is logged in, continue to serve them with jobs
    try {
        const employees = await User.find(
            { usertype: "employee" },
            {
                _id: 1,
                name: 1,
                email: 1
            }).limit(10);
        return res.status(200).json(employees);
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
        const employee = await User.findOne(
            { usertype: "employee" },
            {
                _id: 1,
                name: 1,
                email: 1
            }).limit(10);
        return res.status(200).json(employee);
        res.json({ 'message': "employee with the provided ID could not be found" });
    } catch (err) {
        res.json({ message: err });
    }
});

// get user by id
router.patch('/', verify, async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    try {
        if (req.body.name == "undefined" && req.body.email == "undefined" ) {
            const updatedUser = await User.updateOne(
                { _id: user._id },
                {
                    $set:
                    {
                        usertype: "employer"
                    }
                });
            console.log("2");
            res.json(updatedUser);
        } else {
            const updatedUser = await User.updateOne(
                { _id: user._id },
                {
                    $set:
                    {
                        name: req.body.name,
                        email: email,
                    }
                });
            console.log("2");
            res.json(updatedUser);
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }

});


module.exports = router;
