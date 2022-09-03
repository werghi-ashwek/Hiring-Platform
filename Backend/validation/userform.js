const validator = require('validator');

const isEmpty = require('./is_empty');

module.exports = validateuserformfield = (data) =>  {

    let errors = {};


    if(validator.isEmpty(data.fullname)) {
        errors.fullname = 'fullname Field is required'
    }

    if(validator.isEmpty(data.email)) {
        errors.email = 'email Field is required'
    }
    if(!validator.isEmail(data.email)) {
        errors.email = 'enter a valid email'
    }

    /*if(validator.isEmpty(data.phone)) {
        errors.phone = 'phone Field is required'
    }
    if(validator.isEmpty(data.adress)) {
        errors.adress = 'adress Field is required'
    }
    if(validator.isEmpty(data.state)) {
        errors.state = 'state Field is required'
    }
    if(validator.isEmpty(data.city)) {
        errors.city = 'city Field is required'
    }
    if(validator.isEmpty(data.fields.school)) {
        errors.school = 'school Field is required'
    }
    if(validator.isEmpty(data.fields.major)) {
        errors.major = 'major Field is required'
    }
    if(validator.isEmpty(data.experience.jobtitle)) {
        errors.jobtitle = 'jobtitle Field is required'
    }
    if(validator.isEmpty(data.experience.startmonth)) {
        errors.startmonth = 'start month Field is required'
    }
    if(validator.isEmpty(data.experience.startyear)) {
        errors.startyear = 'start year Field is required'
    }
    if(validator.isEmpty(data.experience.endmonth)) {
        errors.endmonth = 'end month Field is required'
    }
    if(validator.isEmpty(data.experience.endyear)) {
        errors.endyear = 'end year Field is required'
    }*/

    return{
        errors,
        isValid: isEmpty(errors)
    
    };
       

}