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
const jobUpdateValidation  = (data) => {
    const schema = {
        title: Joi.string().
            min(6),
        description: Joi.string().
            min(6),
        location: Joi.string().
            min(6)
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
const companyUpdateValidation = (data) => {
    const schema = {
        name: Joi.string().
            min(6),
        address: Joi.string().
            min(6),
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
const employeeJobValidation = (data) => {
    const schema = {
        employee_id: Joi.string().
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
            min(6),
        email: Joi.string().
            min(6).
            email()
    };
    return Joi.validate(data, schema);
}
const userUpdateValidation  = (data) => {
    const schema = {
        name: Joi.string().
            min(6).
            required(),
        email: Joi.string().
            min(6).
            email().
            required()
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updatePassordValidation = updatePassordValidation ;
module.exports.companyValidation = companyValidation;
module.exports.companyUpdateValidation = companyUpdateValidation;
module.exports.jobValidation = jobValidation;
module.exports.jobUpdateValidation = jobUpdateValidation ;
module.exports.companyJobValidation = companyJobValidation;
module.exports.employeeJobValidation = employeeJobValidation;
module.exports.userValidation = userValidation;
module.exports.userUpdateValidation = userUpdateValidation ;
