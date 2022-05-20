const router = require('express').Router();
const verify = require('./verifyToken');

const controller = require('./Controller/JobsController');

// get all jobs
router.get('/', verify, controller.getAllJobs);

// get job by id
router.get('/:jobId', verify, controller.getJobId);

// create new job
router.post('/', verify, controller.createNewJob);


// Update the job
router.patch('/:jobId', controller.updateJob);

// delete job 
router.delete('/:jobId', verify, controller.deleteJob)


module.exports = router;
