const router = require('express').Router();
const verify = require('./verifyToken');

const controller = require('./Controller/AuthController');

// VIEW PROFILE
router.get('/profile/:userId', controller.viewProfile);

// REGISTER BEW USER
router.post('/register', controller.registerNewUser);

// LOGIN
router.post('/login', controller.login);

// UPDTE PASSWORD
router.patch('/update-password', controller.updatePassword);

// UPDATE USER PROFILE
router.patch('/update-profile/:userId', verify, controller.updateUserPartially);

// UPDATE ENTIRE USER PROFILE
router.put('/update-profile/:userId', verify, controller.updateUserFully);

// DELETE USER PROFILE
router.delete('/delete-profile/:userId', controller.deleteUser);

module.exports = router;
