const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const Company = require('../model/Company');

const { companyValidation, companyUpdateValidation } = require('../validation');

// get all companies
router.get('/', verify, async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //user is logged in, continue to serve them with compnay

    try {
        const companies = await Company.find().limit(10);
        res.status(200).json(companies);
    } catch (err) {
        res.status(500).json({ message: err });
    }

});

// get company by id
router.get('/:companyId', verify, async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //user is logged in, continue to serve them with company
    try {
        const company = await Company.findById(req.params.companyId);
        if (company != null) {
            res.status(200).send(company);
            return;
        }
        res.json({ 'message': "Company with the provided ID could not be found" });
    } catch (err) {
        res.json({ message: err });
    }

});

// create new company
router.post('/', verify, async (req, res) => {
    //return res.send("companies");
    // check if the user is already in the db for further processing 
    const user = await User.findOne({ user_id: req.body.user_id });
    if (user) {
        const manager = await Company.findOne({ manager: user._id });
        //return res.send(manager);
        if (manager != null) {
            return res.status(200).send("Operation failed, User can only manage one company at the time");
        } else if (user.usertype == "employer") {
            // validate data before making a user
            const { error } = companyValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message)

            //create new company
            const company = new Company({
                name: req.body.name,
                address: req.body.address,
                manager: user._id
            });
            //return res.send(company);

            //save company
            try {
                const savedCompany = await company.save();
                res.send(savedCompany );
            } catch (err) {
                res.status(400).send(err);
            }
        }
        return res.status(200).send("Operation failed, User must be an employer before they can create company");
    }
    return res.status(200).send("Access denied, please login to access this page");
});



// Update the company
router.patch('/:companyId', async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    // validate data before updating a comapny
    const { error } = companyUpdateValidation (req.body);
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const updatedCompany = await Company.updateOne(
            { _id: req.params.companyId },
            {
                $set:
                {
                    name: req.body.name,
                    address: req.body.address,
                    manager: req.body.manager
                }
            });
        res.json(updatedCompany);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// delete job applications for one user 
router.delete('/:companyId', verify, async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    try {
        const company = await Company.findOne({ _id: req.params.companyId });

        if (company != null) {
            const removeCompany = await Company.remove({ _id: req.params.companyId });
            return res.send("Company deleted successfully");
        } else {
            return res.send("It looks company does not exist for this user");
        }
    } catch (err) {
        return res.status(400).json({ message: err });
    }

})

module.exports = router;
