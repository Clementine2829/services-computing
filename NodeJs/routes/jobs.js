const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const Company = require('../model/Company');
const Job = require('../model/Job');

const { jobValidation } = require('../validation');

// get all jobs
router.get('/', verify, async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //user is logged in, continue to serve them with jobs

});

// get company by id
router.get('/job_id', verify, async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //user is logged in, continue to serve them with jobs

});

// create new job
router.post('/', verify, async (req, res) => {
    // check if the user is already in the db for further processing 
    const user = await User.findOne({ user_id: req.body.user_id });
    if (user) {
        const manager = await Company.findOne({ manager_id: user.user_id });
        if (manager) {
            // validate data before making a user
            const { error } = jobValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message)

            //create new job
            const job = new Job({
                title: req.body.title,
                description: req.body.description
            });

            //save job
            try {
                const savedJob = await job.save();
                res.send(savedJob);
            } catch (err) {
                res.status(400).send(err);
            }
        }
        return res.status(200).send("Operation failed, Employer not linked to any company yet");
    }
    return res.status(200).send("Access denied, please login to access this page");
});

module.exports = router;
