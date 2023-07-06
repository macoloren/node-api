const { check } = require('express-validator');
const AppError = require('../../errors/appError')
const userService = require('../../services/user.Service')
const { ROLES, ADMIN_ROLE, USER_ROLE } = require('../../constants/index')
const { validResult } = require('../commons')
const { validJWT, hasRole } = require('../auth/index')

//VALIDACIONES PARA EL METODO POST
const _nameRequired = check('name', 'Name required').not().isEmpty().isLength({ min: 3 }).withMessage("name is short").isLength({ max: 100 }).withMessage("name is long")
const _lastNameRequired = check('lastName', 'lastName required').not().isEmpty()
const _passwordRequired = check('password', 'Password required').not().isEmpty().isLength({ min: 8 }).withMessage('password is short')
const _birthdateValid = check('birthdate', 'birthdate not valid').optional().isDate({ format: 'MM-DD-YYYY' })
const _emailRequired = check('email', 'Email required').not().isEmpty()
const _emailValid = check('email', 'Email is invalid').isEmail()
const _emailExist = check('email').custom(
    async (email = '') => {
        const emailFoud = await userService.findByEmail(email)
        if (emailFoud) {
            throw new AppError('Email alredy exist in DB', 400)
        }
    }
);

const _validationRole = check('role').optional().custom(
    async (role = '') => {
        if (!ROLES.includes(role)) {
            throw new AppError('Rol no valido', 400)
        }
    }
);


//VALIDACIONES PARA EL METODO PUT
const _idValid = check('id', 'ID not valid').isMongoId()
const _idRequired = check('id', 'id required').not().isEmpty()
const _idExist = check('id').custom(
    async (id = '') => {
        const userFound = await userService.findById(id)
        if (!userFound) {
            throw new AppError('the ID does not exist in DB', 400)
        }
    }
);
const _optionalEmailValid = check('email', 'Email is invalid').optional().isEmail()
const _optionalEmailExist = check('email').optional().custom(
    async (email = '') => {
        const emailFoud = await userService.findByEmail(email)
        if (emailFoud) {
            throw new AppError('Email alredy exist in DB', 400)
        }
    }
);


const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _lastNameRequired,
    _passwordRequired,
    _emailRequired,
    _emailValid,
    _emailExist,
    _validationRole,
    _birthdateValid,
    validResult
]

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idValid,
    _idRequired,
    _idExist,
    _nameRequired,
    _lastNameRequired,
    _validationRole,
    _birthdateValid,
    _optionalEmailValid,
    _optionalEmailExist,
    validResult
]

const getAllRequestValidations = [
    validJWT
]

const getOneRequestValidations = [
    _idValid,
    _idRequired,
    _idExist,
    validResult
]

const deleteOneRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idValid,
    _idRequired,
    _idExist,
    validResult
]


module.exports = {
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidations,
    getOneRequestValidations,
    deleteOneRequestValidations
}