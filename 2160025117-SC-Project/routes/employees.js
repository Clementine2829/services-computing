const router = require('express').Router();
const verify = require('./verifyToken');

const controller = require("./controller/EmployeesController")

//get list of employees
router.get('/', verify, controller.getAllEmployees);

// get list of jobs applied by this userID
router.get('/:userId/jobs', verify, controller.getAllJobsByEmployee);

// get this job applied of this userId
router.get('/:userId/jobs/:jobId', verify, controller.getJobAppliedByEmployee);

// apply to a job
router.post('/:userId/jobs/:jobId', verify, controller.applyToJob);

// change user profile from employee to employer
router.patch('/:userId', verify, controller.changeProfileToEmployer);

// delete one job application 
router.delete('/:userId/jobs/:jobId', verify, controller.deleteJobApplication)

// delete job applications for one user 
router.delete('/:userId/jobs/', verify, controller.deleteAllEmployeeJobApplicatoin)

module.exports = router;
