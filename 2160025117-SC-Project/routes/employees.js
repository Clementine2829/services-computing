const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

const { userValidation, employeeJobValidation } = require('../validation');
const EmployeeJobs = require('../model/EmployeeJobs');

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

// apply to a job
router.post('/:jobId/jobs', verify, async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (user) {
        const application = await EmployeeJobs.findOne({ employee_id: user._id, job_id: req.params.jobId });
        //return res.send(application);
        if (application != null) {
            return res.status(200).send("Operation failed, You already applied to this job");
        } else if (user.usertype == "employee") {
            // validate data before making a user

            const { error } = employeeJobValidation({ user_id: user._id.toString(), job_id: req.params.jobId });
            if (error) return res.status(400).send(error.details[0].message)
            
            //create new employeejob application
            const employeeJob = new EmployeeJobs({
                user_id: user._id,
                job_id: req.params.jobId
            });
            return console.log(employeeJob);

            //save employeeJob
            //try {
            //    const savedEmployeeJob = await EmployeeJobs.save();
            //    res.send(savedEmployeeJob);
            //} catch (err) {
            //    res.status(400).send(err);
            //}
        } else es.status(200).send("Operation failed, User must be an employee to be able to apply for job");
    } else res.status(200).send("Access denied, please login to access this page");
    return;
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
            });
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
        const usertype = "employer";
        if (req.body.name == undefined && req.body.email == undefined ) {
            const updatedUser = await User.updateOne(
                { _id: user._id },
                {
                    $set:
                    {
                        usertype: usertype
                    }
                });
            res.json(updatedUser);
            console.log("1");
        } else {
            // validate data before making a user
            const { error } = userValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message)

            const updatedUser = await User.updateOne(
                { _id: user._id },
                {
                    $set:
                    {
                        name: req.body.name,
                        email: req.body.email
                    }
                });
            res.json(updatedUser);
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }

});


module.exports = router;
