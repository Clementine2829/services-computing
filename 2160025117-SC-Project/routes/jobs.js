const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const Company = require('../model/Company');
const CompanyJob = require('../model/CompanyJobs');
const Job = require('../model/Job');

const { jobValidation, jobUpdateValidation, companyJobValidation } = require('../validation');

// get all jobs
router.get('/', verify, async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //user is logged in, continue to serve them with jobs
    try {
        const jobs = await Job.find().limit(10);
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// get job by id
router.get('/:jobId', verify, async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //user is logged in, continue to serve them with jobs
    try {
        const job = await Job.findById(req.params.jobId);
        if (job != null) {
            res.status(200).send(job);
            return;
        }
        res.json({ 'message': "Job with the provided ID could not be found" });
    } catch (err) {
        res.json({ message: err });
    }
});

// create new job
router.post('/', verify, async (req, res) => {
    // check if the user is already in the db for further processing 
    const user = await User.findOne({ user_id: req.body.user_id });
    if (user) {
        const company = await Company.findOne({ manager_id: user.user_id });
        if (company) {
            // validate data before making a job
            const { error } = jobValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message)

            //create new job
            const job = new Job({
                title: req.body.title,
                location: req.body.location,
                description: req.body.description
            });

            //save job
            try {
                const savedJob = await job.save();
                //res.send(savedJob);

                // lind job to company
                const companyJob = new CompanyJob({
                    company_id: company._id,
                    job_id: savedJob._id
                })

                // validate data before making 
                const { error2 } = companyJobValidation(companyJob);
                if (error2) return res.status(400).send("Job failed to be linked to company");

                try {
                    const savedCompanyJob = await companyJob.save();
                    //res.send(savedCompanyJob);
                } catch (e) {
                    //do nothing with the error here
                    return res.status(400).send(e);
                }
                return res.send(savedJob);
            } catch (err) {
                res.status(400).send(err);
            }
        }
        return res.status(200).send("Operation failed, Employer not linked to any company yet");
    }
    return res.status(200).send("Access denied, please login to access this page");
});


// Update the job
router.patch('/:jobId', async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    // validate data before making a job
    const { error } = jobUpdateValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const updatedJob = await Job.updateOne(
            { _id: req.params.jobId },
            {
                $set:
                {
                    title: req.body.title,
                    location: req.body.location,
                    description: req.body.description
                }
            });
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// delete job applications for one user 
router.delete('/:jobId', verify, async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    try {
        const job = await Job.findOne({ _id: req.params.jobId });

        if (job != null) {
            const removeJob = await Job.remove({ _id: req.params.jobId });
            return res.send("Job deleted successfully");
        } else {
            return res.send("It looks job does not exist for this user");
        }
    } catch (err) {
        return res.status(400).json({ message: err });
    }

})


module.exports = router;
