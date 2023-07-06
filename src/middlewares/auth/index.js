const { check } = require('express-validator');
const { validResult } = require('../commons')
const { validToken, validRole } = require('../../services/auth.Service')


const _passwordRequired = check('password', 'Password required').not().isEmpty().isLength({ min: 8 }).withMessage('password is short')

const _emailRequired = check('email', 'Email required').not().isEmpty()
const _emailValid = check('email', 'Email is invalid').isEmail()

const postLoginRequestValidations = [
    _passwordRequired,
    _emailRequired,
    _emailValid,
    validResult
]

//validar que en el header lleve un token
const validJWT = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = await validToken(token);
        req.user = user;
        next();
    } catch (error) {
        next(error)
    }
};

const hasRole = (...roles) => {
    return (req, res, next) => {
        try {
            validRole(req.user, ...roles)
            next()
        } catch (error) {
            next(error)
        }

    }
}


module.exports = {
    postLoginRequestValidations,
    validJWT,
    hasRole
}