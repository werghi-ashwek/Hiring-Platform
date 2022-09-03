const validator = require('validator');

const isEmpty = require('./is_empty');

module.exports = validateRegisterInput = (data) =>  {

    let errors = {};

    //data.fullname = !isEmpty(data.fullname) ? data.fullname : "" ;

    if(!validator.isLength(data.fullname, {min: 2, max: 30})) {
        errors.fullname ="Name Must Be Between 2 and 30 Characters";
    }

    if(validator.isEmpty(data.fullname)) {
        errors.fullname ="Name Field Is Required";
    }

    if(validator.isEmpty(data.email)) {
        errors.email ="Email Field Is Required";
    }

    if(!validator.isEmail(data.email)) {
        errors.email ="Email is invalid";
    }

    if(validator.isEmpty(data.password)) {
        errors.password ="Password Field Is Required";
    }

    if(!validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password ="Password  should at least have 6 characters";
    }


    return{
        errors,
        isValid: isEmpty(errors)
    
    };
       

}