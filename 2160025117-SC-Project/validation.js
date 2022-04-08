//Validation
const Joi = require('joi');

const registerValidation = (data) => {
    const schema = {
        name: Joi.string().
            min(6).
            required(),
        email: Joi.string().
            min(6).
            required().
            email(),
        password: Joi.string().
            min(6).
            required()
    };
    return Joi.validate(data, schema);
}
const loginValidation = (data) => {
    const schema = {
        email: Joi.string().
            min(6).
            required().
            email(),
        password: Joi.string().
            min(6).
            required()
    };
    return Joi.validate(data, schema);
}
const updatePassordValidation = (data) => {
    const schema = {
        oldpassword: Joi.string().
            min(6).
            required(),
        newpassword: Joi.string().
            min(6).
            required()
    };
    return Joi.validate(data, schema);
}
const jobValidation = (data) => {
    const schema = {
        title: Joi.string().
            min(6).
            required(),
        description: Joi.string().
            min(6).
            required(),
        location: Joi.string().
            min(6).
            required()
    };
    return Joi.validate(data, schema);
}
const companyValidation = (data) => {
    const schema = {
        name: Joi.string().
            min(6).
            required(),
        address: Joi.string().
            min(6).
            required(),
        manager: Joi.string().
            min(6)
    };
    return Joi.validate(data, schema);
}
const companyJobValidation = (data) => {
    const schema = {
        company_id: Joi.string().
            min(6).
            required(),
        job_id: Joi.string().
            min(6).
            required()
    };
    return Joi.validate(data, schema);
}
const userValidation = (data) => {
    const schema = {
        name: Joi.string().
            min(6).
            required(),
        email: Joi.string().
            min(6).
            required().
            email()
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updatePassordValidation = updatePassordValidation ;
module.exports.companyValidation = companyValidation;
module.exports.jobValidation = jobValidation;
module.exports.companyJobValidation = companyJobValidation;
module.exports.userValidation = userValidation;
