const router = require('express').Router();
const verify = require('./verifyToken');
const controller = require("./controller/CompaniesController")


// get all companies
router.get('/', verify, controller.getAllCompanies);

// get company by id
router.get('/:companyId', verify, controller.getCompanyById);

// create new company
router.post('/', verify, controller.createNewCompany);

// Update the company
router.patch('/:companyId', verify, controller.updateCompany);

// delete job applications for one user 
router.delete('/:companyId', verify, controller.deleteCompany)

module.exports = router;
