const jwt = require('jsonwebtoken');

//create a middleware function 
module.exports = function (req, res, next) {
    //check if there is a token wehn sending the request
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access denied'); //resource cannot access errr 

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRETE);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}
