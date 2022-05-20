const router = require('express').Router();
const verify = require('./verifyToken');

const controller = require('./Controller/EmployerController');

// get list of employers
router.get('/', verify, controller.getAllEmployers);

// get company by manager
router.get('/:userId/companies', verify, controller.getCompnayByManager);

// change user profile from employer to employee
router.patch('/:userId', verify, controller.changeProfileToEmployee);

// change manager
router.patch('/:userId/companies/:companyId', verify, controller.changeManager);

module.exports = router;
