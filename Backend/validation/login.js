const validator = require('validator');

const isEmpty = require('./is_empty');

module.exports = validateLoginInput = (data) =>  {

    let errors = {};


    if(validator.isEmpty(data.email)) {
        errors.email = 'Email Field is required'
    }

    if(!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }

    if(validator.isEmpty(data.password)) {
        errors.password = 'Password Field is required'
    }

    return{
        errors,
        isValid: isEmpty(errors)
    
    };
       

}