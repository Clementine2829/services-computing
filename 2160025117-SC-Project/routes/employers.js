const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const Company = require('../model/Company');

// get list of employers
router.get('/', verify, async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //user is logged in, continue to serve them with companies
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

// get list of employers
router.get('/:userId/companies', verify, async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //user is logged in, continue to serve them with the company
    try {
        const company = await Company.findOne(
            { manager: req.params.userId },
            {
                _id: 1,
                name: 1,
                address: 1,
                manager: 1,
                date: 1
            });
        return res.status(200).json(company);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// change user profile from employer to employee
router.patch('/:userId', verify, async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            {
                $set:
                {
                    usertype: "employee"
                }
            });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});
// change manager
router.patch('/:userId/companies/:companyId', verify, async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (user) {
        const manager = await Company.findOne({ manager: req.params.userId});
        if (manager != null) {
            return res.status(200).json({ manager });
        } else if (user.usertype == "employer") {
            try {
                const updatedCompany = await Company.updateOne(
                    { _id: req.params.companyId },
                    {
                        $set:
                        {
                            manager: req.params.userId
                        }
                    });
                res.json(updatedCompany);
            } catch (err) {
                res.status(400).json({ message: err });
            }
        } else return es.status(200).send("Operation failed, User must be an employer to be able to apply for job");
    } else return res.status(200).send("Access denied, please login to access this page");
});




module.exports = router;
