const User = require('../../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { registerValidation,
    loginValidation,
    userValidation,
    userUpdateValidation,
    updatePassordValidation } = require('../../validation');

exports.viewProfile = async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //get the user
    const tempUser = await User.findOne(
        { _id: req.params.userId },
        {
            _id: 1,
            name: 1,
            email: 1,
            usertype: 1,
            date: 1
        });
    if (!tempUser) return res.status(200).send("User profile with the provided ID not found");
    return res.json(tempUser);
}


exports.registerNewUser = async (req, res) => {
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
        res.send({ userId: user._id, name: user.name, email: user.email });
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.login = async (req, res) => {
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
}

exports.updatePassword = async (req, res) => {
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
}

exports.updateUserPartially = async (req, res) => {

    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    try {
        //validate data before changing a user details
        const { error } = userValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            {
                $set:
                {
                    name: req.body.name,
                    email: req.body.email
                }
            });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

exports.updateUserFully = async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    try {
        //validate data before changing a user details
        const { error } = userUpdateValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            {
                $set:
                {
                    name: req.body.name,
                    email: req.body.email
                }
            });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

exports.deleteUser = async (req, res) => {
    // check if the user is logged in or not
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) return res.status(200).send("Access denied, please login to access this page");

    //delete the user
    try {
        const tempUser = await User.findOne({ _id: req.params.userId });
        if (tempUser != null) {
            const deletedUser = await User.remove({ _id: req.params.userId });
            return res.send("User profile deleted successfully");
        } else {
            return res.send("It looks like user profile does not exist");
        }
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}


