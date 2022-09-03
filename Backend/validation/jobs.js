const validator = require('validator');

const isEmpty = require('./is_empty');

module.exports = validatejobfield = (data) =>  {

    let errors = {};


    if(validator.isEmpty(data.title)) {
        errors.title = 'Title Field is required'
    }

    if(validator.isEmpty(data.description)) {
        errors.description = 'description Field is required'
    }

    if(validator.isEmpty(data.skill)) {
        errors.skill = 'skills Field is required'
    }
    if(validator.isEmpty(data.salary)) {
        errors.salary = 'salary Field is required'
    }
    if(validator.isEmpty(data.publisher)) {
        errors.publisher = 'publisher Field is required'
    }

    return{
        errors,
        isValid: isEmpty(errors)
    
    };
       

}