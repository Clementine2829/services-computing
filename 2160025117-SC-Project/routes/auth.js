const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { registerValidation, loginValidation, updatePassordValidation } = require('../validation');


// REGISTER BEW USER
router.post('/register', async (req, res) => {
    // validate data before making a user
    const { error } = registerValidation(req.body); 
    if (error) return res.status(400).send(error.details[0].message)

    // check if the user is already in the db by their email address
    const emaiExist = await User.findOne({ email: req.body.email });
    if (emaiExist) return res.status(400).send("Email aready exist");

    // Hash the password 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    // create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        res.send({ userId: user._id, name: user.name, email: user.email});
    } catch (err) {
        res.status(400).send(err);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    // validate data before making a user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // check if the user is already in the db for further processing 
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(200).send("Invalid username or password");
    // check if password is correct 
    //arg1 is the password from user, arg2 is the password from the db
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(200).send("Invalid username or password");

    //create and assign a token 
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRETE); //pass in some kind of data
    res.header('auth-token', token).send(token);

    //res.send("Logged in!");
});


// UPDTE PASSWORD
router.patch('/update-password', async (req, res) => {
    // validate data before making a user
    const { error } = updatePassordValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    // check if password is correct
    //arg1 is the password from user, arg2 is the password from the db
    const validPass = await bcrypt.compare(req.body.oldpassword, user.password);
    if (!validPass) return res.status(200).send("Invalid old password");

    try {
        // Hash the password 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.newpassword, salt);

        const updatedUser = await User.updateOne(
            { _id: user._id },
            {
                $set:
                {
                    password: hashPassword
                }
            });
        res.json({ "message": "Password changed successfully" });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});



// DELETE PROFILE
router.delete('/delete-profile', async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //delete the user
    const deletedUser = await User.updateOne({ _id: user._id });

    //return the course name
    res.send(deletedUser);
});

module.exports = router;
