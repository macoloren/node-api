const { check, validationResult } = require('express-validator');
const AppError = require('../../errors/appError')
const userService = require('../../services/user.Service')
const { ROLES } = require('../../constants/index')

//VALIDACIONES PARA EL METODO POST
const _nameRequired = check('name', 'Name required').not().isEmpty()
const _lastNameRequired = check('lastName', 'lastName required').not().isEmpty()
const _passwordRequired = check('password', 'Password required').not().isEmpty()
const _birthdateValid = check('birthdate', 'birthdate not valid').optional().isDate({format: 'MM-DD-YYYY'})
const _emailRequired = check('email', 'Email required').not().isEmpty()
const _emailValid = check('email', 'Email is invalid').isEmail()
const _emailExist = check('email').custom(
    async(email = '') => {
        const emailFoud = await userService.findByEmail(email)
        if(emailFoud){
            throw new AppError('Email alredy exist in DB', 400)
        }
    }
);

const _validationRole = check('role').optional().custom(
    async(role = '') => {
        if(!ROLES.includes(role)){
            throw new AppError('Rol no valido', 400)
        }
    }
);

const _validationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new AppError('Validation Errors', 400, errors.errors)
    }
    next();
};


//VALIDACIONES PARA EL METODO PUT
const _idValid = check('id', 'ID not valid').isMongoId()
const _idRequired = check('id', 'id required').not().isEmpty()
const _idExist = check('id').custom(
    async(id = '') => {
        const userFound = await userService.findById(id)
        if(!userFound){
            throw new AppError('the ID does not exist in DB', 400)
        }
    }
);
const _optionalEmailValid = check('email', 'Email is invalid').optional().isEmail()
const _optionalEmailExist = check('email').optional().custom(
    async(email = '') => {
        const emailFoud = await userService.findByEmail(email)
        if(emailFoud){
            throw new AppError('Email alredy exist in DB', 400)
        }
    }
);


const postRequestValidations = [
    _nameRequired,
    _lastNameRequired,
    _passwordRequired,
    _emailRequired,
    _emailValid,
    _emailExist,
    _validationRole,
    _birthdateValid,
    _validationResult
]

const putRequestValidations = [
    _idValid,
    _idRequired,
    _idExist,
    _nameRequired,
    _lastNameRequired,
    _validationRole,
    _birthdateValid,
    _optionalEmailValid,
    _optionalEmailExist,
    _validationResult
]

const getOneRequestValidations = [
    _idValid,
    _idRequired,
    _idExist
]

const deleteOneRequestValidations = [
    _idValid,
    _idRequired,
    _idExist
]


module.exports = {
    postRequestValidations,
    putRequestValidations,
    getOneRequestValidations,
    deleteOneRequestValidations
}