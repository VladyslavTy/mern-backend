const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    const minNameLenght = 2;
    const maxNameLenght = 30;
    const minPasswordLenght = 6;
    const maxPasswordLenght = 30;

    data.name = !isEmpty(data.name) ? data.name :  '';
    data.email = !isEmpty(data.email) ? data.email :  '';
    data.password = !isEmpty(data.password) ? data.password :  '';
    data.passwordConfirmation = !isEmpty(data.passwordConfirmation) ? data.passwordConfirmation :  '';


    if(!Validator.isLength(data.name, {min: minNameLenght, max: maxNameLenght})){
        errors.name = `Name must be between ${minNameLenght} and ${maxNameLenght} characters`;
    }


    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

    if(!Validator.isLength(data.password, {min: minPasswordLenght, max: maxPasswordLenght})){
        errors.name = `Name must be between ${minPasswordLenght} and ${maxPasswordLenght} characters`;
    }

    if(Validator.isEmpty(data.passwordConfirmation)){
        errors.passwordConfirmation = 'Password field is required';
    }

    if(!Validator.equals(data.password, data.passwordConfirmation)){
        errors.passwordConfirmation = 'Confirm password field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};