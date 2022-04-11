const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const EmployeeJobs = require('../model/EmployeeJobs');
const Job = require('../model/Job');

const { userValidation, employeeJobValidation } = require('../validation');
const { application } = require('express');

//get list of employees
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

// get list of jobs applied by this userID
router.get('/:userId/jobs', verify, async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (user) {
        //const applications = await EmployeeJobs.find({ employee_id: user._id });
        const applications = await EmployeeJobs
            //.where({ employee_id: user._id })
            .aggregate([
                {
                    $lookup:
                    {
                        from: "jobs",
                        localField: "job_id",
                        foreignField: "_id",
                        as: "job"
                    }
                }
            ]);
        //console.log(applications);
        return res.send(applications);
    } else return res.send("Access denied, you must be logged in to access this page");

});

// get this job applied of this userId
router.get('/:userId/jobs/:jobId', verify, async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (user) {
        //const applications = await EmployeeJobs.find({ employee_id: user._id });
        const applications = await EmployeeJobs
            //.where({ employee_id: user._id })
            .aggregate([
                {
                    $lookup:
                    {
                        from: "jobs",
                        localField: "job_id",
                        foreignField: "_id",
                        let: { job_id: req.params.jobId },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $not: [
                                            { $eq:["$_id", "$$job_id"]}
                                        ]
                                    }
                                }
                            },
                            { $project: { _id: 1, title: 1, description: 1, location: 1 } }
                        ],
                        as: "job"
                    }
                },
                { $limit: 1 },
            ]);
        //console.log(applications);
        return res.send(applications);
    } else return res.send("Access denied, you must be logged in to access this page");

});

// apply to a job
router.post('/:userId/jobs/:jobId', verify, async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (user) {
        const application = await EmployeeJobs.findOne({ employee_id: req.params.userId, job_id: req.params.jobId });
        //return console.log({ employee_id: user._id, job_id: req.params.jobId });
        if (application != null) {
            return res.status(200).send("Operation failed, You already applied to this job");
        } else if (user.usertype == "employee") {
            // validate data before making a user

            const { error } = employeeJobValidation({ employee_id: req.params.userId.toString(), job_id: req.params.jobId });
            if (error) return res.status(400).send(error.details[0].message)

            //create new employeejob application
            const employeeJob = new EmployeeJobs({
                employee_id: user._id.toString(),
                job_id: req.params.jobId
            });
            //return console.log(employeeJob);

            //save employeeJob
            try {
                const savedEmployeeJob = await employeeJob.save();
                return res.status(200).send(savedEmployeeJob);
            } catch (err) {
                return res.status(400).send(err);
            }
        } else return es.status(200).send("Operation failed, User must be an employee to be able to apply for job");
    } else return res.status(200).send("Access denied, please login to access this page");
});

// change user profile from employee to employer
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
                    usertype: "employer"
                }
            });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// delete one job application 
router.delete('/:userId/jobs/:jobId', verify, async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    try {
        const employeeJob = await EmployeeJobs.find({ employee_id: req.params.userId, job_id: req.params.jobId });
        if (employeeJob != null) {
            const removeEmployeeJob = await EmployeeJobs.remove({ employee_id: req.params.userId, job_id: req.params.jobId });
            return res.send("Job application deleted successfully" );
        } else {
            return res.send("It looks like this job application does not exist" );
        }
    } catch (err) {
        return res.status(400).json({ message: err });
    }
})

// delete job applications for one user 
router.delete('/:userId/jobs/', verify, async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    try {
        const employeeJobs = await EmployeeJobs.find({ employee_id: req.params.userId });

        if (employeeJobs != null) {
            const removeEmployeeJobs = await EmployeeJobs.remove({ employee_id: req.params.userId });
            return res.send("Job applications deleted successfully" );
        } else {
            return res.send("It looks job application does not exist for this user" );
        }
    } catch (err) {
        return res.status(400).json({ message: err });
    }

})


module.exports = router;
